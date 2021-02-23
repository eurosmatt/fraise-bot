const fs = require('fs')
const { MessageEmbed } = require("discord.js")

module.exports = {
    run: async(bot, message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à warn.')
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas warn le propriétaire du serveur.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas warn ce membre.')
        const reason = args.slice(1).join(' ')
        if (!reason) return message.channel.send('Veuillez indiquer une raison.')
        if (!bot.db.warns[member.id]) bot.db.warns[member.id] = []
        bot.db.warns[member.id].unshift({
            reason,
            date: Date.now(),
            mod: message.author.id
        })


        const embed = new MessageEmbed()
            .setAuthor(`${member.user.username} (${member.id})`)
            .setColor('#ffa500')
            .setDescription(`**Action**: warn\n **Raison**: ${reason}`)
            .setThumbnail(member.user.avatarURL())
            .setTimestamp()
            .setFooter(message.author.username, message.author.avatarURL());
            let WarnChannel = message.guild.channels.cache.find(channel => channel.name === 'logsfraise');
            if(!WarnChannel) return message.channel.send('Salon \`logsfraise\` n\'a pas été trouver. Merci d\'en créer un')
                   WarnChannel.send(embed)

        fs.writeFileSync('./db.json', JSON.stringify(bot.db))
        message.channel.send(`${member} a été warn pour ${reason} !`)
    },
}
    module.exports.config = {
    name: 'warn',
    guildOnly: true
}
