const mongoose = require("mongoose");
const { Schema } = mongoose;

const playersSchema = new Schema({
    discord_username: String,
    karma: {type: Number, default: 1},
    characters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Characters"
    }],
});

module.exports = mongoose.model("Players", playersSchema);