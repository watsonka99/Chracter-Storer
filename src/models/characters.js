const mongoose = require("mongoose");
const { Schema } = mongoose;

const charactersSchema = new Schema({
    name: String,
    xp: { type: Number, default: 0},
    class: String,
    archetype: String,
    gold: Number,
    created: { type: Date, default: Date.now},
    lastModified: { type: Date, default: Date.now},
    player_name: String,
    character_id: String
});

module.exports = mongoose.model("Characters", charactersSchema);