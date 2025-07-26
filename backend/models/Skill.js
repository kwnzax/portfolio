const mongoose = require("mongoose")

const skillSchema = mongoose.Schema({
    logo: {type: String, required: true},
    name: { type: String, required: true },
    level: {type: Number, required: true}
})

module.exports = mongoose.model("Skill", skillSchema);