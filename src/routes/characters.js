const express = require("express"),
    router = express.Router();

// MODELS
const Characters = require("../models/Characters.js")
const Players = require("../models/Players.js")

router.get("/players/:playerID/new_character", (req, res) => {
    res.render("characters/create", {playerID: req.params.playerID});
});

router.post("/players/:playerID/create_character", (req, res) => {
    Players.findById(req.params.playerID, (err, player) => {
        if (err) {
            console.log(err);
            return;
        }
        else {
            Characters.create({
                name: req.body.name,
                class: req.body.class,
                archetype: req.body.archetype,
            }, (char_err, character) => {
                if (char_err) {
                    console.log(char_err);
                    return;
                }
                player.characters.push(character);
                player.save();
            });
        }
    });
});

router.get("/players/:playerID/character/:characterID", (req, res) => {
    res.render("characters/create", {playerID: req.params.playerID});
});

router.get("/ett_characters", (req, res) => {
    Characters.find({}, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.render("characters/index", {characters: data});
    });
});

module.exports = router;
