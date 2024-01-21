const client = require('../../index.js');

const { PREFIX } = require('../../config.json');

const db = require("quick.db");

const sd = require("../../schemas/command.js")

const { MessageEmbed } = require("discord.js");

  client.on('messageCreate', async message => {

    if (message.author.bot) return;

    if (!message.content.startsWith(PREFIX)) return;

    if (!message.guild) return;

    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);

    const cmd = args.shift().toLowerCase();

    if (cmd.length == 0) return;

    let cmdx = db.get(`cmd_${message.guild.id}`)

if(cmdx) {

  let cmdy = cmdx.find(x => x.name === cmd)

  if(cmdy) message.channel.send(cmdy.responce)

}

    let command = client.commands.get(cmd)

    if (!command) command = client.commands.get(client.aliases.get(cmd));

    const check = await sd.findOne({ Guild: message.guild.id })

    if (check) {

      const embed = new MessageEmbed()

        .setTitle("")

        .setDescription(`command ini telah di nonaktifkan oleh owner bot, silahkan hubungi owner untuk mengaktifkan nya kembali`)

        .setColor("RED")

        .setFooter("")

        if(check.Cmds.includes(command.name)) return message.reply({ embeds: [embed] });

      

   command.run(client, message, args)

    } else

    if (command) command.run(client, message, args)

  })