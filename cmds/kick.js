const {MessageEmbed} = require('discord.js')

module.exports.run = async(bot,message,args) => {

    let kickedUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!kickedUser) {
        return message.channel.send('L\'utilisateur :' + kickedUser + ' n\'a pas été trouvé')
    }

    let kickReason = args.join(' ').slice(22);
    if(!kickReason) kickReason = 'Aucune raison';
    
    if(!message.member.hasPermission('MANAGE_MESSAGES')) {
        return message.chanel.send("Vous n'avez pas la permission")
    }
    if(kickedUser.hasPermission('KICK_MEMBERS')) {
        return message.channel.send('Vous ne pouvez pas kick cette personne car elle a la permission \`MANAGE_MESSAGE\`')
    }

    let kickEmbed = new MessageEmbed()
    .setDescription('Legs')
    .setColor('RANDOM')
    .addField('User expulsée', `${kickedUser} (ID: ${kickedUser.id})`)
    .addField('Author de l\'expulsion ', `${message.author} (ID: ${message.author.id})`)
    .addField('Salon ou la commande a été effectuer', message.channel)
    .addField('Raison de l\'expulsion', kickReason)

    let kickChannel = message.guild.channels.cache.find(channel => channel.name === 'logsfraise');
    if(!kickChannel) {
        return message.channel.send('Salon \`logsfraise\` n\'a pas été trouver. Merci d\'en créer un')
    }

    message.guild.member(kickedUser).kick(kickReason)
    kickChannel.send(kickEmbed)

}

module.exports.config = {
    name: "kick"
}