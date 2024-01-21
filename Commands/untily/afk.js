const db = require('quick.db')

const { MessageEmbed } = require('discord.js')

module.exports = {

    name : 'afk',

    run : async(client, message, args) => {

        const content = args.join(" ")

        await db.set(`afk-${message.author.id}+${message.guild.id}`, content)

        const embed = new MessageEmbed()

        .setDescription(`Anda telah diatur ke afk\n**Alasan :** ${content}`)

        .setColor("GREEN")

        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true }))

        message.channel.send({ embeds: [embed] })                

    }

                     }