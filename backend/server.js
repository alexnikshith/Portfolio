import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Load existing messages
const loadMessages = () => {
  if (!fs.existsSync("messages.json")) return [];
  return JSON.parse(fs.readFileSync("messages.json"));
};

// Save messages
const saveMessages = (msgs) => {
  fs.writeFileSync("messages.json", JSON.stringify(msgs, null, 2));
};

// POST - save new message
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  const messages = loadMessages();
  messages.push({
    name,
    email,
    message,
    date: new Date().toISOString()
  });

  saveMessages(messages);

  res.json({ success: true, msg: "Message received!" });
});

// GET - view all messages
app.get("/messages", (req, res) => {
  const messages = loadMessages();
  res.json(messages);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
