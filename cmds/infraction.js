const moment = require('moment'),
    Discord = require('discord.js')

moment.locale('fr')

module.exports = {
    run: async(bot, message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre dont voir les warns.')
        if (!bot.db.warns[member.id]) return message.channel.send('Ce membre n\'a aucun warn.')
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`**Total de warns :** ${bot.db.warns[member.id].length}\n\n__**10 derniers warns**__\n\n${bot.db.warns[member.id].slice(0, 10).map((warn, i) => `**${i + 1}.** ${warn.reason}\nSanctionné ${moment(warn.date).fromNow()} par <@!${warn.mod}>`).join('\n\n')}`))
            .setColor('#fd0083')
    },
}
    module.exports.config = {
    name: 'infractions',
    guildOnly: true
}
