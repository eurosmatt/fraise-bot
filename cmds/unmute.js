const { MessageEmbed } = require('discord.js')
const ms = require ("ms");
    
module.exports.run = (bot, message, args) => {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Vous n'avez pas la permission !")


            let user = message.guild.member(message.mentions.users.first());
            if(!user) return message.reply("Veuillez mentionné la personne !")
            let muteRole = message.guild.roles.cache.find(r => r.name === 'muted');

            if (!user.roles.cache.has(muteRole.id)) return message.reply("L'utilisateur mentionné n'est pas muté");
            
            user.roles.remove(muteRole.id);
           
            message.channel.send(`<@${user.id}> n'est plus muté !`);

            const embed = new MessageEmbed()
            .setAuthor(`${user.user.username} (${user.id})`)
            .setColor('#ffa500')
            .setDescription(`**Action**: unmute`)
            .setThumbnail(user.user.avatarURL())
            .setTimestamp()
            .setFooter(message.author.username, message.author.avatarURL());
            let MuteChannel = message.guild.channels.cache.find(channel => channel.name === 'logsfraise');
            if(!MuteChannel) return message.channel.send('Salon \`logsfraise\` n\'a pas été trouver. Merci d\'en créer un')
                   MuteChannel.send(embed)
            
        };     
        module.exports.config = {
            name: 'unmute',
            aliases: ['unmute'],
            description: 'Unmute un utilisateur',
            cooldown: 10,
            usage: '<@user>',
            isUserAdmin: true,
            permissions: true,
            args: true
        };