const { MessageEmbed } = require("discord.js")
const { prefix } = require('../db/config.json')
module.exports.run = async(bot,message,args) => {

    if(args[0] == "help") return message.channel.send(`Vous devez juste faire : ${prefix}help.`);

    if(args[0]) {
        let command = args [0];
        if(bot.command.has(command)) {
            command = bot.commands.get(command)
            let SHembed = new MessageEmbed()
            .setColor('#fc6f6f')
            .setAuthor('Help | Fraise', message.guild.iconURL({dynamic: true, size: 512}))
            .setThumbnail(bot.user.displayAcatarURL({dynamic: true, size: 512}))
            .setDescription(`Le bot à pour préfix : \`${prefix}\`\n\n`)
            message.channel.send(SHembed)
    }}

    let cmdmember = `\`help\` \`serverinfo\` \`userinfo\` \`infos\` \`updateuser\``
    let cmdadmin = `\`kick\` \`ban/tempban\` \`mute/unmute\` \`warn/unwarn/infractions\``
    let cmdmusique = `Pas encors disponible...`
    if(!args[0]) {
        message.delete()
        let embed = new MessageEmbed()
        .setAuthor(`Commande d'aide`, message.guild.iconURL({dynamic: true, size: 512}))
        .setColor('#fc6f6f')
        .setDescription(`${message.author.username} va voir tes mps !`)

        let Sembed = new MessageEmbed()
        .setColor('#fc6f6f')
        .setAuthor(`Aide | Fraise`, message.guild.iconURL({dynamic: true, size: 512}))
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true, size: 512}))
        .setDescription(`Voici toutes les commandes pour le bot \`${bot.user.username}\` \n Le préfix du bot est : \`${prefix}\``)
        .addField('Commandes pour les membres :', cmdmember)
        .addField('Commandes pour le staff :', cmdadmin)
        .addField('Commandes pour la musique :', cmdmusique)
        .setFooter('Si vous avez du mal à utiliser une des commandes n\'hésité pas faire un ticket ou aller sur le serveur de support : https://discord.gg/PErEdfYjK6', bot.user.displayAvatarURL({dynamic: true, size: 512}))
        message.channel.send(embed)
        .then(m => name.delete({timeout: 5000}))
        message.author.send(Sembed).catch(() => message.channel.send('Soit la personne à désactiver ces messages privés soit une interferance est venu'))
        

    }
}

module.exports.config = {
    name: "help"
}