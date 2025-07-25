const mongoose = require("mongoose")

const projetSchema = mongoose.Schema({
    minia: {type: String, required: true},
    title: { type: String, required: true },
    images: { type: String, required: true },
    description: { type: String, required: true },
    contrainte: { type: String, required: true },
    tags: {type: String, required: true},
    codeGithub: {type: String, required: true}
})

module.exports = mongoose.model("Projet", projetSchema);