const express = require("express"),
    router = express.Router();

// MODELS
const Players = require("../models/Players.js")

// router.get("/sign_up", (req, res) => {
//     res.render("players/create");
// });

router.get("/players", (req, res) => {
    Players.find({}, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.render("players/index", {players: data});
    });
});

router.get("/new_player", (req, res) => {
    res.render("players/create");
});

router.post("/create_player", (req, res) => {
    Players.create({
        discord_username: req.body.player_name,
        karma: req.body.karma,
    }, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(req.body.name + ' added')
    });
});

router.get("/players/:playerID", (req, res) => {
    Players.findById(req.params.playerID).populate("characters").exec((err, players) => {
        if (err) {
            console.log(err);
            return;
        }
        res.render("players/show", {player: players, characters: players.characters});
    });
        
});

module.exports = router;
