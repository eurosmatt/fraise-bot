const fs = require('fs')

module.exports = {
    run: async(bot, message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à unwarn.')
        if (!bot.db.warns[member.id]) return message.channel.send('Ce membre n\'a aucun warn.')
        const warnIndex = parseInt(args[1], 10) - 1
        if (warnIndex < 0 || !bot.db.warns[member.id][warnIndex]) return message.channel.send('Ce warn n\'existe pas.')
        const { reason } = bot.db.warns[member.id].splice(warnIndex, 1)[0]
        if (!bot.db.warns[member.id].length) delete bot.db.warns[member.id]
        fs.writeFileSync('./db.json', JSON.stringify(bot.db))
        message.channel.send(`${member} a été unwarn pour ${reason} !`)
    },
}
    module.exports.config = {
    name: 'unwarn',
    guildOnly: true
}