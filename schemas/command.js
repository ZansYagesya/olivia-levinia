const mongoose = require("mongoose");

const sdSchema = new mongoose.Schema({

    Guild: String,

    Cmds: Array

})

module.exports = mongoose.model('sd', sdSchema);