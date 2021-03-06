const path = require("path");
const fs = require("fs")
const { notes } = require('../../db/db');
const router = require("express").Router();


//added get router
router.get('/notes', (req, res) => {
    res.json(notes);
});

//added post route 
router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    notes.push(req.body)
    res.json(req.body);
});

//added delete option to delete notes
router.delete('/notes/:id', (req, res) => {
    const notesId = req.params.id
    for (var i = 0; i < notes.length; i++) {
        if (notesId === notes[i].id) {
            notes.splice(i, 1)
        }
    }
    res.json({})
})

module.exports = router;