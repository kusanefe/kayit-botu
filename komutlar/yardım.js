const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;
exports.run = (client, message, args) => {
  
    const codemarefi= new Discord.RichEmbed()
    .setColor('GOLD')
    .setAuthor(`Meldaus`, client.user.avatarURL) 
      .setDescription('**✧ Puky#7878**')
      .addField('** Komutlar (4)**', '`erkek`, `kız`, `say`, `nick`')
    .setFooter(``, client.user.avatarURL)
    message.channel.send(codemarefi).catch()

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['yardım'],
    permLevel: 0
};

exports.help = {
    name: 'yardım',
      category: 'Yardım Menüsü',
      description: 'bilgi',
};