const mongoose = require("mongoose")

const toolSchema = mongoose.Schema({
    logo: {type: String, required: true},
    name: { type: String, required: true }
})

module.exports = mongoose.model("Tool", toolSchema);