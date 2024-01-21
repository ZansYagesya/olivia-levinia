// Schema User

const mongoose = require('mongoose');

const warnSchema = new mongoose.Schema({

  userId: { type: String, required: true, unique: true },

  username: { type: String, required: true },

  warns: { type: Number, default: 0 }, // Jumlah peringatan (warn)

});

const Warn = mongoose.model('Warn', warnSchema);

module.exports = Warn;