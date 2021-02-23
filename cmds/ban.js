const {MessageEmbed} = require('discord.js')
 
module.exports.run = async(bot,message,args) => {
 
    let BannedUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!BannedUser) {
        return message.channel.send('L\'utilisateur :' + BannedUser + ' n\'a pas été trouvé')
    }
 
    let BanReason = args.join(' ').slice(22);
    if(!BanReason) BanReason = 'Aucune raison';
 
    if(!message.member.hasPermission('BAN_MEMBERS')) {
        return message.chanel.send("Vous n'avez pas la permission")
    }
    if(BannedUser.hasPermission('BAN_MEMBERS')) {
        return message.channel.send('Pour pouvoir utiliser la commande \`ban\` vous devez avoir la permission Bannir des members.')
    }
 
    let BanEmbed = new MessageEmbed()
    .setDescription('Legs')
    .setColor('RANDOM')
    .addField('User banni', `${BannedUser} (ID: ${BannedUser.id})`)
    .addField('Author du bannisement ', `${message.author} (ID: ${message.author.id})`)
    .addField('Salon ou la commande a été effectuer', message.channel)
    .addField('Raison du bannisement', BanReason)
 
    let BanChannel = message.guild.channels.cache.find(channel => channel.name === 'logsfraise');
    if(!BanChannel) {
        return massage.channel.send('Salon \`logsfraise\` n\'a pas été trouver. Merci d\'en créer un')
    }
 
    BannedUser.ban({reason: BanReason});
    BanChannel.send(BanEmbed);
}
 
module.exports.config = {
    name: "ban"
}
