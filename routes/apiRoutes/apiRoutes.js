const path = require("path");
const fs = require("fs")
const { notes } = require('../../db/db');
const router = require("express").Router();

//Get Notes
router.get('/notes', (req, res) => {
    res.json(notes);
});

//Post Notes
router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    notes.push(req.body)
    res.json(req.body);
});

//Delete Notes 
router.delete('/notes/:id', (req, res) => {
    const id = req.params.id
    for (var i = 0; i < notes.length; i++) {
        if (id === notes[i].id) {
            notes.splice(i, 1)
        }
    }
    res.json({})
})

module.exports = router;