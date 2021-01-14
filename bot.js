const db = require('quick.db')
const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};


client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}; 
/////✧ Puky#7878

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
  };

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});


//✧ Puky#7878

client.login(ayarlar.token);

//--KOMUTLAR--\\

/////OTOİSİM
client.on('guildMemberAdd', member => {
 member.setNickname('Sunucuya girenlerin ismi')////YENI GELENLERE VERILCEK ISIM
})

///OTOROL
client.on('guildMemberAdd', member => {
  
  let rol = 'Gelecek kişiye verilecek rol idsi'
 member.addRole(rol)
})

//✧ Puky#7878

//OTOTAG

client.on('userUpdate', async user => {
  let sunucuid = "698169165755842641"; // Sunucu ID | ✧ Puky#7878
  let tag = "§"; // Sunucu Tagınız
  let rol = "716614136032919562"; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
  let channel = client.guilds.get(sunucuid).channels.find(x => x.name == 'tag-log'); // Tag alanların logunun düşeceği kanalın ismi ( Değişebilirsiniz.)
  if (!tag) return;
  if (!rol) return;
  if (!channel) return;
  let member = client.guilds.get(sunucuid).members.get(user.id);
  if (!member) return;
  if (!member.roles.has(rol)) {
    if (member.user.username.includes(tag)) {
      member.addRole(rol)
      const tagalma = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(` <a:ModernOnayGif:711770866140315659> <@${user.id}> adlı kişi, ${tag} tagımızı aldığından dolayı <@&${rol}> rolünü kazandı. \n\n Tagımızı aldığın için teşekkür ederiz <3`)
      .setTimestamp()
      channel.send(tagalma)
    }
  }else{
    if (!member.user.username.includes(tag)) {
      member.removeRole(rol)
      const tagsilme = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(`<@${user.id}> adlı kişi, ${tag} tagımızı bıraktığı için <@&${rol}> rolünü kaybetti :/`)
      .setTimestamp()
      channel.send(tagsilme)
    }
  }
});

//✧ Puky#7878

//--------------------------------Hg Kanalı---------------------------------\\
client.on('guildMemberAdd',async member => {
  let gkisi = client.users.get(member.id);
  
    const ktarih = new Date().getTime() - gkisi.createdAt.getTime();   
    if (ktarih < 2592000001) 
  member.addRole("FAKE ROL İD")//
  member.removeRole("FAKE UYEDEN ALINACAK ROL")//
});


  //✧ Puky#7878
client.on("guildMemberAdd", member => {
  const kanal = "725730886267437126"; //kişi geldiği zaman mesaj atılacak kanal id //✧ Puky#7878
  moment.locale("tr");// Saat icin gerekli
  let samet = client.channels.get(kanal);
  samet.send(
    " " +
      member +
      "** <a:RainbowSonsuzGif:711770868296187965> Aramıza hoşgeldin kankam! **\n\n<a:RainbowSonsuzGif:711770868296187965> **Seninle Birlikte " +
      member.guild.memberCount +
      " Kişiyiz!** \n\n<a:RainbowSonsuzGif:711770868296187965>  **Kayıt işleminin başlaması için, <@&720412992163807275> yetkililerini etiketleyip ses teyit odalarına geçebilirsin!**  \n\n<a:RainbowSonsuzGif:711770868296187965> **Hesabın Oluşturulma Tarihi :** " +
      moment(member.user.createdAt).format("DD MMMM YYYY, dddd  hh:mm:ss**") +
      " \n\n**<a:RainbowSonsuzGif:711770868296187965> Kayıt işlemin bittikten sonra aşşağıdaki kanallara inip sohbet edebilirsin dostum!** \n\n\n**<a:yldz:711772909471006730> Dionysos | Kingdom <a:yldz:711772909471006730>**",
    new Discord.Attachment(
      "https://cdn.discordapp.com/attachments/723432893514252291/725325522560614410/DASDASD.gif"
    )
  );
});

client.on('ready', () => {
  console.log(`TEST ${client.user.tag}`);
});

client.on('message', msg => {
  if (msg.content === 'test') {
    msg.reply('test!');
  }
});

client.on("ready", () => {
  client.channels.get("Bot aktif olunca girmek istediğiniz kanalın idsi").join();
})
  //✧ Puky#7878