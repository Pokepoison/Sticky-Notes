const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dbFilePath = path.join(__dirname, 'Develop', 'db', 'db.json');

const getNotes = () => {
  const data = fs.readFileSync(dbFilePath, 'utf8');
  return JSON.parse(data);
};

const saveNotes = (notes) => {
  fs.writeFileSync(dbFilePath, JSON.stringify(notes), 'utf8');
};

router.get('/notes', (req, res) => {
  const notes = getNotes();
  res.json(notes);
});

router.post('/notes', (req, res) => {
  const newNote = req.body;
  const notes = getNotes();
  notes.push(newNote);
  saveNotes(notes);
  res.json(newNote);
});

router.delete('/notes/:id', (req, res) => {
  const idToDelete = req.params.id;
  const notes = getNotes().filter((note) => note.id !== idToDelete);
  saveNotes(notes);
  res.json({ message: 'Note deleted successfully' });
});

module.exports = router;
