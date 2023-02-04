const express = require("express"),
    router = express.Router();

// MODELS
const Characters = require("../models/Characters.js")
const Players = require("../models/Players.js")

function xp_calculation(length, adventure_level, character_level, gm=false) {
    if (gm) return length * 1.5;
    switch(adventure_level - character_level) {
        case -3:
            return length* 0.35
        case -2:
            return length * 0.5
        case -1:
            return length * 0.7
        case 0:
            return length
        case 1:
            return length * 1.4
        case 2:
            return length * 2
        case 3: 
            return length * 2.8
    }
}

function karma_calculator(start_xp, end_xp) {
    console.log(start_xp, end_xp)
    if (start_xp < 12 && 12 <= end_xp ) return 3;
    if (end_xp %12 < start_xp % 12 ) return 1;
    return 0;
}

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
    Characters.findById(req.params.characterID, (err, character) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(character)
        res.render("characters/show", {playerID: req.params.playerID, character: character});
    });
});

router.get("/players/:playerID/character/:characterID/adventure_reward", (req, res) => {
    res.render("characters/adventure_reward", {playerID: req.params.playerID, characterID: req.params.characterID});
});

router.post("/players/:playerID/character/:characterID/adventure_input", (req, res) => {
    let gm = false;
    let karma = 0
    let xp = 0;
    if (req.body.gm === 'on') gm = true;
    if (req.body.karma === 'on') karma++;
    if (req.body.tt === 'on') karma--;
    xp = xp_calculation(req.body.length, req.body.adventure_level, req.body.character_level, gm);
    Characters.findOneAndUpdate(req.params.characterID, {$inc: {'xp': xp}}, (err, character) => {
        if (err) {
            console.log(err);
            return;
        }
        if (req.body.disable !== 'on') karma += karma_calculator(character.xp - xp, character.xp);
        Players.findOneAndUpdate(req.params.playerID, {$inc: {'karma': karma}}, (err, player) => {
            if (err) {
                console.log(err);
                return;
            }
        });
    });
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
