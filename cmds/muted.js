const { MessageEmbed } = require('discord.js')
const ms = require ("ms");
    
module.exports.run = async(bot, message, args) => {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Vous n'avez pas la permission !")

    let muteReason = args.slice(2).join(" ")
    if(!muteReason) muteReason = 'Aucune raison';

    if(!args[0]) return message.reply("Veuillez mettre un argument")
            let user = message.guild.member(message.mentions.users.first());
            if(!user) return message.reply("Veuillez mentionné la personne !")
            let muteRole = message.guild.roles.cache.find(r => r.name === 'muted');
            let muteTime = (args[1] || '60s');
            
            if (!muteRole) {
                muteRole = await message.guild.roles.create({
                    data: {
                        name: 'muted',
                        color: '#000',
                        permissions: []
                    }
                });
        
                message.guild.channels.cache.forEach(async (channel, id) => {
                    await channel.updateOverwrite(muteRole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        CONNECT: false
                    });
                });      
            }
            
            await user.roles.add(muteRole.id);

            message.channel.send(`<@${user.id}> est muté pour ${ms(ms(muteTime))}.`);
        
            setTimeout(() => {
                user.roles.remove(muteRole.id);
                user.roles.remove('797463612150251521');
        
            }, ms (muteTime));

            const embed = new MessageEmbed()
            .setAuthor(`${user.user.username} (${user.id})`)
            .setColor('#ffa500')
            .setDescription(`**Action**: mute\n**Temps**: ${ms(ms(muteTime))}\n **Raison**: ${muteReason}`)
            .setThumbnail(user.user.avatarURL())
            .setTimestamp()
            .setFooter(message.author.username, message.author.avatarURL());
            let MuteChannel = message.guild.channels.cache.find(channel => channel.name === 'logsfraise');
            if(!MuteChannel) return message.channel.send('Salon \`logsfraise\` n\'a pas été trouver. Merci d\'en créer un')
                   MuteChannel.send(embed)
        }    
        module.exports.config = {
            name: 'mute',
            aliases: ['mute'],
            description: 'Mute un utilisateur',
            cooldown: 10,
            usage: '<@user> <time>',
            isUserAdmin: true,
            permissions: true,
            args: true
        };