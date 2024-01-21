const http = require('http');

const mongoose = require("mongoose");

const express = require('express');

const fs = require('fs')

const app = express();

const Warn = require('./schemas/warn.js');

const db = require("quick.db")

app.get("/", (request, response) => {

  console.log('Pinging');

  response.sendStatus(200);

});

app.listen(process.env.PORT);

setInterval(() => {

  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);

}, 280000);

const { Client, Intents, Collection, MessageEmbed, discord } = require('discord.js');

const client = new Client({

         intents: 32767

     })

  client.commands = new Collection();

client.aliases = new Collection();

client.categories = fs.readdirSync("./Commands");

client.events = new Collection();

client.slashCommands = new Collection();

module.exports = client;

["Command", "Event"].forEach(handler => {

  require(`./Structures/${handler}`)(client);

});

client.once('ready', () => {

  console.log(`[READY] ${client.user.tag} is ready`)

})

process.on('unhandledRejection', err => {

  console.log(`[ERROR] Unhandled promise rejection: ${err.message}.`);

  console.log(err);

});

mongoose

  .connect(    `mongodb+srv://Fauzan08:11111@cluster0.ju3njpp.mongodb.net/data`,

    {

      useNewUrlParser: true,

      useUnifiedTopology: true,

    }

  )

  .then(() => console.log("Berhasil terhubung ke database"))

  .catch((err) =>

    console.log(

      `Errors have been occured while trying to connect to Mongo DB | ${err}`

    )

  );

client.on("ready", () => { 

  setInterval(() => {

    const aA = [

      `With you darling`,

      `always with you`

    ]

    const as = aA[Math.floor(Math.random() * aA.length)]

 client.user.setPresence({ status: 'dnd' });

    client.user.setActivity(as, { type: "PLAYING" });

  }, 3000)

});

client.on('guildMemberAdd', member => {

  const channel = member.guild.channels.cache.get("1187534872512831538");

  if (!channel) return;

  const embed = new MessageEmbed()

    .setColor('#0099ff')

    .setTitle('')

    .setDescription(`**halo ${member.user.username}, baca petunjuk dibawah ya!**

*verifikasi diri kamu di:*

<#1190936938681733161> / <id:customize>

*baca rules server di:*

<#1187006104736112761>

*baca panduan server di:*

<#1188229653899509790>

*ambil role kamu di:*

<#1187234035529953393>

**nb: semoga kamu betah disini dan jangan ragu untuk ikut chat dengan member lain.**<:emoji_47:1191042208606994432>`)   .setThumbnail("https://media.discordapp.net/attachments/1190101920963113044/1190471371394912296/6cb28710-3828-4d4f-9b0c-334fc9a0f6af.gif?ex=65a1ebdc&is=658f76dc&hm=349f34a180982e349ebdbe547d953b2befec6922fdc3d8d6ad3961e0b44282ce&")

    .setImage("https://media.discordapp.net/attachments/1187859875905142854/1190504540911444009/New_Project_35_E7F79EC.png?ex=65a20ac1&is=658f95c1&hm=8e3c8cfd2785a375b009302ba043dcba13e1d74d26925f8a99f119d6cd94bced&")

    .setTimestamp();

  

  channel.send(`Selamat datang <@${member.user.id}> di **World Of Teyvat!**`);

  channel.send({ embeds: [embed] });

});

  let AllowCommands = false;

const triggerWords = ["pagi", "siang", "malam", "sore", "halo", "hi"];

const allowedID = "939711643141689384";

client.on("messageCreate", async message => {

  if (message.author.bot || message.author.id !== allowedID) return;

   

  var lowercaseMessage = message.content.toLowerCase();   

  var response = "";

  if (triggerWords.some(word => lowercaseMessage.includes(word))) {

    AllowCommands = true;

  }

  if (AllowCommands) {

    const keywordResponses = {

    "": [ { trigger: "belum ngantuk", response: "tetep aja tidur sana nanti kamu kalo sakit bikin repot" },

      { trigger: "tidur dulu", response: "okey selamat malam ya" },

      { trigger: "ngapain", response: "hemm begitu yaudah" },

      { trigger: "gabut", response: "hemm lagi gabut yaudah" },

         { trigger: "males", response: "dasar manusia pemalas" },

         { trigger: "seperti biasa", response: "hemm begitu yaudah" },

         { trigger: "baik", response: "syukurlah kalau begitu" },

         { trigger: "cuek", response: "hehe~<:emoji_48:1191671753739612170>"},

    ],

    // Tambahkan kata kunci lain dengan respons yang sesuai di sini

  };

  const matchedKeywordResponse = Object.entries(keywordResponses).find(([keyword]) => lowercaseMessage.includes(keyword));

  if (matchedKeywordResponse) {

    const responses = matchedKeywordResponse[1];

    for (const resp of responses) {

      if (lowercaseMessage.includes(resp.trigger)) {

        response = resp.response;

        break; // Keluar dari loop setelah menemukan respons yang cocok

      }

    }

  }

  if (response !== "") {

message.channel.sendTyping();

    message.reply(response);

  }

  if (lowercaseMessage.includes("thank")) {

    AllowCommands = false;

  }     

}

});

//fast respon owner

client.on("messageCreate", async message => {

  if (message.author.bot || message.author.id !== allowedID) return;

  var wordsToRespond = {

    "pagi": ["pagi juga, gimana kabarnya?", "pagi juga, lagi ngapain?"],

    "siang": ["siang juga, gimana kabarnya?", "siang juga, lagi ngapain?"],

    "sore": ["sore juga, gimana kabarnya?", "sore juga, lagi ngapain?"],

    "malam": ["malam juga, kok kamu belum tidur? tidur sana kesiangan nanti kamu", "malam juga, kok kamu belum tidur? tidur sana nanti sakit kamu kalau keseringan begadang"],

    "hi": ["hi juga, gimana kabarnya?", "hi juga, lagi ngapain?"],

    "halo": ["halo juga, gimana kabarnya?", "halo juga, lagi ngapain?"]

  }; // Daftar kata-kata yang ingin dipantau beserta responsnya

  var lowercaseMessage = message.content.toLowerCase();

  var messageWords = lowercaseMessage.split(/\s+/); // Memecah pesan menjadi kata-kata

  // Memeriksa apakah pesan hanya terdiri dari 1 atau 2 kata yang ada dalam daftar

  if (messageWords.length <= 2) {

    const firstWord = messageWords[0];

    const secondWord = messageWords[1] || ''; // Mengatasi jika pesan hanya satu kata

    if (Object.keys(wordsToRespond).includes(firstWord) || Object.keys(wordsToRespond).includes(secondWord)) {

      const responses = wordsToRespond[firstWord] || wordsToRespond[secondWord];

      const randomIndex = Math.floor(Math.random() * responses.length);

      const response = responses[randomIndex];

if (!message.content.includes(response)) {

        message.channel.sendTyping();

        message.reply(response);

      }

    }

  }

});

// Menentukan peran yang diizinkan menggunakan perintah

var blockedUserIDs = ["939711643141689384"];

client.on("messageCreate", async message => {

  if (blockedUserIDs.includes(message.author.id)) return;

  var wordsToRespond = {

    "pagi": ["pagi juga"],

    "hai": ["hai juga"],

    "siang": ["siang juga"],

    "sore": ["sore juga"],

    "malam": ["malam juga"],

    "hi": ["hi juga"],

    "halo": ["halo juga"]

  }; // Daftar kata-kata yang ingin dipantau beserta responsnya

  var lowercaseMessage = message.content.toLowerCase();

  var messageWords = lowercaseMessage.split(/\s+/); // Memecah pesan menjadi kata-kata

  // Memeriksa apakah pesan hanya terdiri dari 1 atau 2 kata yang ada dalam daftar

  if (messageWords.length <= 2) {

    const firstWord = messageWords[0];

    const secondWord = messageWords[1] || ''; // Mengatasi jika pesan hanya satu kata

    if (Object.keys(wordsToRespond).includes(firstWord) || Object.keys(wordsToRespond).includes(secondWord)) {

      const responses = wordsToRespond[firstWord] || wordsToRespond[secondWord];

      const randomIndex = Math.floor(Math.random() * responses.length);

      const response = responses[randomIndex];

      if (!message.content.includes(response)) {

        message.channel.sendTyping();

        message.reply(response);

      }

    }

  }

});

const forbiddenWords = ['fuck', 'kontol', 'jomok', 'memek', 'puki', 'peler', 'pepek', 'bokep', 'kntl', 'pler', 'goblok', 'gblk', 'nigga', 'tolol', 'dick', 'tai', 'ngentot', 'lonte']; // List kata-kata yang dilarang

const exemptedMembers = ['939711643141689384', '1184488865239670839'];

client.on('messageCreate', async message => {

  if (message.author.bot) return;

  const lowercaseMessage = message.content.toLowerCase();

  if (exemptedMembers.includes(message.author.id)) {

    return; // Tidak melakukan pengecekan apapun jika pengguna termasuk dalam daftar pengecualian

  }

  const containsForbiddenWord = forbiddenWords.some(word => {

  const regex = new RegExp(`\\b${word}\\b`, 'gi');

  return regex.test(lowercaseMessage);

});

  if (containsForbiddenWord) {

    message.channel.sendTyping();

    const user = await Warn.findOne({ userId: message.author.id });

    if (!user) {

      const newWarn = new Warn({

        userId: message.author.id,

        username: message.author.username,

        warns: 1,

      });

      await newWarn.save();

    } else {

      user.warns += 1;

      await user.save();

      if (user.warns === 3 || user.warns === 5 || user.warns === 9 || user.warns === 12) {

        let muteDuration = 0;

        if (user.warns === 3) muteDuration = 86400000; // 1 hari

        else if (user.warns === 5) muteDuration = 259200000; // 3 hari

        else if (user.warns === 9) muteDuration = 604800000; // 7 hari

        else if (user.warns === 12) muteDuration = 1209600000; // 14 hari

        // Memberikan role muted kepada pengguna

        const member = message.guild.members.cache.get(message.author.id);

        const mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted'); // Pastikan role 'Muted' sudah ada

        if (member && mutedRole) {

          await member.roles.add(mutedRole);

          const unmuteTime = new Date(Date.now() + muteDuration).toUTCString();

          const formattedDuration = durationToTime(muteDuration);

          const membed = new MessageEmbed()

    .setColor('#ea00ff')

    .setTitle('')

    .setDescription(`<@${message.author.id}> kamu telah dimuted dan akan di unmuted pada **${unmuteTime}<:emoji_36:1190929475769213078>**`)

    message.channel.send({ embeds: [membed] })

          .then(sentMessage => {

      setTimeout(() => {

        sentMessage.delete();

      }, 20000); // Menghapus pesan yang dikirim setelah 10 detik (dalam milidetik)

    })

          setTimeout(async () => {

            await member.roles.remove(mutedRole);

          }, muteDuration);

        }

      }

    }

    message.delete();

    const wembed = new MessageEmbed()

    .setColor('#ea00ff')

    .setTitle('')

    .setDescription(`<@${message.author.id}> **kamu mendapatkan ${user.warns} peringatan<:emoji_32:1190880279225712701>, silahkan cek <#1187006104736112761> dan baca hukumannya<:emoji_33:1190887585560666202>**`)

    message.channel.send({ embeds: [wembed] })

    .then(sentMessage => {

      setTimeout(() => {

        sentMessage.delete();

      }, 10000); // Menghapus pesan yang dikirim setelah 10 detik (dalam milidetik)

    })

  }

});

function durationToTime(duration) {

  const seconds = Math.floor((duration / 1000) % 60);

  const minutes = Math.floor((duration / (1000 * 60)) % 60);

  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  

  return `${hours} jam, ${minutes} menit, ${seconds} detik`;

}

client.on("messageCreate", async message => {

  if (message.author.bot || message.channel.type === "DM") return;

  if(db.has(`afk-${message.author.id}+${message.guild.id}`)) {

        const info = db.get(`afk-${message.author.id}+${message.guild.id}`)

        await db.delete(`afk-${message.author.id}+${message.guild.id}`)

    const embed7 = new MessageEmbed()

        .setDescription(`Status afk Anda telah dihapus [${info}]`)

        .setColor("RANDOM")

        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true }))

        message.channel.send({ embeds: [embed7] })

    .then(sentMessage => {

      setTimeout(() => {

        sentMessage.delete();

      }, 10000); // Menghapus pesan yang dikirim setelah 10 detik (dalam milidetik)

    })

    }

    //checking for mentions

    if(message.mentions.members.first()) {

        if(db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) {

            message.channel.send(message.mentions.members.first().user.tag + ":" + db.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`))

          .then(sentMessage => {

      setTimeout(() => {

        sentMessage.delete();

      }, 10000); // Menghapus pesan yang dikirim setelah 10 detik (dalam milidetik)

    })

        }else return;

    }else;        

});

  

client.login(process.env.BOT)