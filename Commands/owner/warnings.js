const Warn = require("../../schemas/warn.js")

const { MessageEmbed } = require("discord.js")

module.exports = {

  name: "warnings",

  aliases: ["wt"],

  usage: "sm2",

  description: "say commands",

  run: async (client, message, args) => {

    const userToCheck = message.mentions.users.first() || message.author;

    const user = await Warn.findOne({ userId: userToCheck.id });

    if (!user) {

      return message.reply('Pengguna tidak memiliki peringatan (warn).');

    }

    const embed = new MessageEmbed()

    .setColor('#ea00ff')

    .setTitle('TOTAL WARN')

    .addField(`Pengguna ${user.username}`, `memiliki **${user.warns}** peringatan<:emoji_32:1190880279225712701>`)

    .setThumbnail("https://media.discordapp.net/attachments/1099532006653702165/1190885364873826404/0ad79201-dced-47bc-8100-973f764477a0.gif?ex=65a36d6c&is=6590f86c&hm=8cc1718fdd267fd2feee5f4ef47e9598b4a5768bd9eca0a2cc0e574eebe51657&")

.setDescription(`*hukuman:*

1. 3 peringatan: **1 hari muted**

2. 5 peringatan: **3 hari muted**

3. 9 peringatan: **7 hari muted**

4. 12 peringatan: **14 hari muted**`)

         

    

     message.reply({ embeds: [embed] });

    //return message.reply(

    //  `Pengguna ${user.username} (${user.userId}) memiliki total ${user.warns} peringatan (warn).`

  }

}