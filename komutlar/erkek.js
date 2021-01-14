const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  
  
 if(!message.member.roles.has('Kullanabilecek rol idsi')) return message.channel.send('Bu kodu kullanmak için yeterli yetkin yok!')  //✧ Puky#7878
  
  let member = message.mentions.members.first();
  let isim = args[1]
  let yaş = args[2]
  let al = "717887392492683265"; ///alınacak rol idsi
  let ver = "716440696847990906"; ///verilecek rol idsi
  let rer = "720414582220521573"; ///verilecek rol idsi
  let ker = "720781258111713344"; ///verilecek rol idsi
  if (!member) return message.channel.send("Bir Kullanıcı Etiketle");
  if (!isim) return message.channel.send("Bir İsim Girmelisin!");
  member.setNickname(`§ ${isim} | ${yaş}`);
  
    member.addRole(ver);
    member.addRole(rer);
    member.addRole(ker);
    member.removeRole(al);
  

  const embed = new Discord.RichEmbed()
    .setColor("BLUE")
    .setTitle("Kayıt Sistemi")
    .setThumbnail(message.author.avatarURL)
    .setDescription( `<a:ModernOnayGif:711770866140315659> Kayıt Edilen Kullanıcı : **${member.user}** \n <a:ModernOnayGif:711770866140315659> Kayıt Eden Yetkili : ${message.author.username} \n <a:ModernOnayGif:711770866140315659> Kayıt Islemınde Verılen Roller : <@&716440696847990906> <@&720781258111713344> <@&720414582220521573>   \n <a:ModernOnayGif:711770866140315659> Alınan Rol : <@&${al}>`)
client.channels.get('725730886267437126').send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["erkek" , "e"],
  permLevel: 0
}
exports.help = {
  name: 'erkek',
  description: "Erkek Kayıt Sıstemı",
  usage: 'Erkek isim yaş'
} 