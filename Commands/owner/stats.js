const { MessageEmbed } = require('discord.js')

module.exports = {

 name: 'uptime',

 description: 'Reloades a command',

 category: 'owner',

 usage: 'reload <category> <command>',

 run: async(client, message, args) => {

const days = Math.floor(client.uptime / 86400000)

            const hours = Math.floor(client.uptime / 3600000) % 24 // 1 Day = 24 Hours

            const minutes = Math.floor(client.uptime / 60000) % 60 // 1 Hour = 60 Minutes

            const seconds = Math.floor(client.uptime / 1000) % 60 // 1 Minute = 60 Seconds

 

            //  Send As Embed

            const embed = new MessageEmbed()

            .setAuthor(`${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))

            .setTimestamp()

            .setColor('#ea00ff')

            .setDescription(`aku online selama

${days} Hari ${hours} Jam ${minutes} Menit ${seconds} Detik

            `)

   message.channel.send({ embeds: [embed] });

 }

     }

