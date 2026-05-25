const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const dataDir = path.join(__dirname, 'data');

const readJSON = (file) => {
  try { return JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf-8')); }
  catch { return null; }
};

const writeJSON = (file, data) => {
  fs.writeFileSync(path.join(dataDir, file), JSON.stringify(data, null, 2));
};

app.get('/api/services', (_, res) => {
  const data = readJSON('services.json');
  data ? res.json(data) : res.status(500).json({ error: 'Failed to load services' });
});

app.get('/api/projects', (_, res) => {
  const data = readJSON('projects.json');
  data ? res.json(data) : res.status(500).json({ error: 'Failed to load projects' });
});

app.get('/api/certifications', (_, res) => {
  const data = readJSON('certifications.json');
  data ? res.json(data) : res.status(500).json({ error: 'Failed to load certifications' });
});

app.get('/api/chat', (_, res) => {
  const data = readJSON('chat.json');
  data ? res.json(data) : res.status(500).json({ error: 'Failed to load chat' });
});

app.post('/api/chat', (req, res) => {
  const { room, user, message } = req.body;
  if (!room || !user || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const data = readJSON('chat.json');
  const newMsg = {
    id: Date.now().toString(),
    room, user, message,
    timestamp: new Date().toISOString(),
  };
  data.messages.push(newMsg);

  const roomReplies = data.autoReplies[room] || data.autoReplies['general'];
  let autoReply = null;
  const lower = message.toLowerCase();
  for (const rule of roomReplies) {
    const triggers = rule.trigger.split('|');
    if (triggers.some((t) => lower.includes(t))) {
      autoReply = {
        id: (Date.now() + 1).toString(),
        room, user: 'SaltedHash AI',
        message: rule.response,
        timestamp: new Date().toISOString(),
      };
      data.messages.push(autoReply);
      break;
    }
  }

  writeJSON('chat.json', data);
  res.json({ success: true, message: newMsg, autoReply });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const contactPath = path.join(dataDir, 'contact.json');
  let contacts = [];
  try { contacts = JSON.parse(fs.readFileSync(contactPath, 'utf-8')); }
  catch { contacts = []; }

  contacts.push({
    id: Date.now().toString(),
    name, email, message,
    timestamp: new Date().toISOString(),
  });

  fs.writeFileSync(contactPath, JSON.stringify(contacts, null, 2));
  res.json({ success: true, message: 'Message sent successfully' });
});

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok', message: 'SaltedHash backend running (JSON-only)' });
});

app.use((err, _, res, __) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`SaltedHash backend running on port ${PORT} (JSON-only)`);
});
