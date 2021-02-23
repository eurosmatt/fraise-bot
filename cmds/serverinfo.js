const Discord = require('discord.js')

module.exports.run = async(bot,message,args) => {

let ServerEmbed = new Discord.MessageEmbed()
        .setAuthor(message.guild.name)
        .setThumbnail(message.guild.iconURL({dynamic: true, size: 512}))
        .addField('Nom du serveur', `${message.guild.name}`)
        .addField('Propriétaire du serveur', message.guild.owner)
        .addField('Nombre de membres', message.guild.memberCount)
        .addField('Nombre de rôles', message.guild.roles.cache.size)
        .setFooter('Information du serveur')
        .setColor('RANDOM')

        message.channel.send(ServerEmbed)
}

module.exports.config = {
    name: "serverinfo"
}