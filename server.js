const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let names = [];
let currentId = 1;

// Get all names
app.get('/names', (req, res) => {
  res.json(names);
});

// Add a name
app.post('/names', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  const newName = { id: currentId++, name };
  names.push(newName);
  res.status(201).json(newName);
});

// Delete a name by ID
app.delete('/names/:id', (req, res) => {
  const id = parseInt(req.params.id);
  names = names.filter(name => name.id !== id);
  res.status(204).end();
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
