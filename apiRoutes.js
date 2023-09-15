const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuid4 } = require('uuid');

const dbFilePath = path.join(__dirname, 'db', 'db.json');

const getNotes = () => {
  // const data = fs.readFileSync(dbFilePath, 'utf8');
  // return JSON.parse(data);
  return new Promise((resolve, reject) => {
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
      if (err) { 
        reject(err);
      }
      else {
        const info = JSON.parse(data) || []
        resolve(info);
      }
    });
  })
};

const saveNotes = (notes) => {
  // fs.writeFileSync(dbFilePath, JSON.stringify(notes), 'utf8');
  return new Promise((resolve, reject) => {
    fs.writeFile(dbFilePath, JSON.stringify(notes), 'utf8', (err) => {
      if (err) reject(err);
      else resolve();
    })
})};

router.get('/notes', (req, res) => {
  getNotes().then((notes) => {
    res.json(notes)  
  }) 
    .catch((err) => res.status(500).json(err));
    // const notes = getNotes();
  // res.json(notes);
});

router.post('/notes', (req, res) => {
  let newNote = req.body;
  newNote.id = uuid4();
  getNotes().then((notes) => {
    notes.push(newNote);
    saveNotes(notes).then(() => res.json(newNote));
  }) .catch((err) => res.status(500).json(err));
  });
  // const notes = getNotes();
  // notes.push(newNote);
  // saveNotes(notes);
  // res.json(newNote);

router.delete('/notes/:id', (req, res) => {
  const idToDelete = req.params.id;
  getNotes().then((notes) => {
    const filteredNotes = notes.filter((note) => note.id !== idToDelete);
    saveNotes(filteredNotes).then(() => res.json({ message: 'Note deleted successfully' }));
  }) .catch((err) => res.status(500).json(err))
  });
  // const notes = getNotes().filter((note) => note.id !== idToDelete);
  // saveNotes(notes);
  // res.json({ message: 'Note deleted successfully' });


module.exports = router;
