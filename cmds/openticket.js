const Discord = require("discord.js")

module.exports.run = async(bot,message,args) => {

    message.delete()
    if(!message.member.hasPermission("ADMINISTRATOR")) return;

    let OpenTicket = new Discord.MessageEmbed()
    .setTitle('La Fraise Gaming | Assistance :')
    .setDescription('Bonjour / Bonsoir, si vous avez une question, un problème ou si vous ne souhaitez qu\'un renseignement, Dites le nous ! ')
    .setColor('#98fcae')

    let myGuild = bot.guilds.cache.get('797463612121022534');
    let SendChannel = myGuild.channels.cache.get('800472666087358484')
    message.channel.send(OpenTicket)
    .then(msg => msg.react('📩'))
}

module.exports.config = {
    name: "openticket"
}