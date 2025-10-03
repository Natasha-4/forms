const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

let users = []; // Temporary in-memory storage

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// RESTful API Endpoints

// Create
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  const id = Date.now().toString();
  const newUser = { id, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Read all
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Update
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = users.find(u => u.id === id);
  if (user) {
    user.name = name;
    user.email = email;
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Delete
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  users = users.filter(u => u.id !== id);
  res.json({ message: 'User deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});