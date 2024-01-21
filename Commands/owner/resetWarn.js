const Warn = require("../../schemas/warn.js")

module.exports = {

  name: "resetwarn",

  aliases: ["rw"],

  usage: "sm2",

  description: "say commands",

  run: async (client, message, args) => {

    

    const targetUser = message.mentions.users.first();

    if (!targetUser) {

      return message.reply('Format pengguna tidak valid. Gunakan: `!resetwarn @nama_pengguna`');

    }

    const targetDBUser = await Warn.findOne({ userId: targetUser.id });

    if (!targetDBUser) {

      return message.reply('Pengguna ini belum memiliki peringatan.');

    }

    // Mereset total peringatan pengguna menjadi 0

    targetDBUser.warns = 0;

    await targetDBUser.save();

    message.reply(`Total peringatan untuk ${targetUser.username} telah direset menjadi 0.`);    

  }

}