const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//get request for api route -- view all notes
app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

//get request for api route -- view note by id
app.get("/api/notes/:id", function(req, res) {
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(notes[Number(req.params.id)]);
});

//get requests for html routes

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

//post request to save notes
app.post("/api/notes", function(req, res) {
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let uniqueID = notes.length.toString();
    newNote.id = uniqueID;
    notes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    console.log("New note saved to database! Content: ", newNote);
    res.json(notes);
});

//delete request to delete a saved note
app.delete("/api/notes/:id", function(req, res) {
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteID = req.params.id;
    let newID = 0;
    console.log(`Note deleted!`);
    notes = notes.filter((currNote) => {
        return currNote.id != noteID;
    });

    for (currNote of notes) {
        currNote.id = newID.toString();
        newID++;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes);
});

//Starts server
app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
});