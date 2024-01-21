const Warn = require("../../schemas/warn.js")

module.exports = {

  name: "warn",

  aliases: ["w"],

  usage: "sm2",

  description: "say commands",

  run: async (client, message, args) => {

     if(message.author.id !== "939711643141689384") return message.channel.send("This command is only for bot owners.");

         

    const userToWarn = message.mentions.users.first();

    if (!userToWarn) {

      return message.reply('Mohon sebutkan member yang ingin diberikan peringatan (warn).');

    }

    const user = await Warn.findOne({ userId: userToWarn.id });

    if (!user) {

      const newUser = new Warn({

        userId: userToWarn.id,

        username: userToWarn.username,

        warns: 1,

      });

      await newUser.save();

    } else {

      user.warns += 1;

      await user.save();

    }

    return message.reply(`Member ${userToWarn.username} telah diberikan peringatan (warn).`);    

  }

}