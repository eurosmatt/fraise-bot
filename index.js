const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require('./db/config.json')
const fs = require ('fs');
const { createConnection } = require('mysql')
let sql;

const db = new createConnection({
    host:'localhost',
    password:'',
    user:'root',
    database:'FraiseBot'

})
db.connect(function (err) {
    if(err) throw err;

    console.log('La connection à été réussi')
});

bot.commands = new Discord.Collection ();
bot.db = require('./db.json')

fs.readdir ('./cmds/', (err, files) => {
    if (err) console.log (err)
    let jsfile = files.filter (f => f.split ('.').pop() === 'js')
    if (jsfile.length <= 0) {
        console.log ('[HANDLER]: Aucune commande trouvée')
    }

    jsfile.forEach((f, i) => {
    let props = require (`./cmds/${f}`);
    console.log (`[HANDLER]: ${f} ok !`)
    bot.commands.set(props.config.name, props)
    })
})
 
bot.on("ready", async () => {
    console.log(`(${bot.user.username}): Online`)

    let statuses = [
        "Prefix - !",
        `En ligne sur ${bot.guilds.cache.size}`,
        "- !help"
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "WATCHING"})
    }, 5000)

})

bot.on("message", async message => {
        
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    // SELECT *
    db.query(`SELECT * FROM user WHERE user = ${message.author.id}`, async (err, req) => {
        if(err) throw err;

        if(req.length < 1) {
            message.channel.send('Nous allons vous enregistrer dans la base de données.')
            // INSERT
            sql = `INSERT INTO user (user, username, message) VALUES (${message.author.id}, '${message.author.username}', '${message.content}')`
            db.query(sql, function(err){
                if(err) throw err;
            })
        } else {
            return;
        }
    });



    let commandFile = bot.commands.get(command.slice(prefix.length))
    if(commandFile) commandFile.run(bot, message, args)

    if(message.content.startsWith(`${prefix}userinfo`)){

      
    }

    if(message.content.startsWith(`${prefix}serverinfo`)){

        

        message.channel.send(ServerEmbed)
    }
})

bot.on('ready', async () => {
        
    let myGuild = bot.guilds.cache.get('797463612121022534');
    let DeleteChannel = myGuild.channels.cache.get('800472666087358484')

    DeleteChannel.bulkDelete(100)

    let OpenTicket = new Discord.MessageEmbed()
    .setTitle('La Fraise Gaming | Assistance:')
    .setDescription('Bonjour / Bonsoir, si vous avez une question, un problème ou si vous ne souhaitez qu\'un renseignement, vous pouvez ouvrir un ticket pour discuter directement avec notre équipe, nous sommes disponibles très souvent et nous vous garantissons une réponse sous 24h maximum.\n\n Pour ouvrir un ticket, il vous suffit de cliquer sur la réaction ci dessous et un ticket sera créé.')
    .setColor('#98fcae')
    
    let guild = bot.guilds.cache.get('797463612121022534');
    let SendChannel = guild.channels.cache.get('800472666087358484')
    SendChannel.send(OpenTicket)
    .then(msg => msg.react('📩'))
})


bot.on ("guildMemberAdd", async member => { 

 
    let botslog = member.guild.channels.cache.find(channel => channel.name === '『👋』𝐁𝐢𝐞𝐧𝐯𝐞𝐧𝐮𝐞') 
 
    let embed = new Discord.MessageEmbed() 
 
    .setAuthor(`La Fraise Gaming`, member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })) 

    .setColor('#ff0000')
 
    .setDescription("**Bonjour et bienvenue** \n sur le serveur Discord de La Fraise Gaming ! \n\n **Premiers pas ! :smile:**\n◆ Tu n'as pas encore accès à l'intégralité du serveur ? \n Pour y remédier, rends toi dans le salon #🔥・𝐑𝐨̂𝐥𝐞𝐬 ! \n\n ◆ Besoin d'aide ? N'hésite pas à contacter l'un des membres du staff ou à utiliser le salon #『🎫』𝐓𝐢𝐜𝐤𝐞𝐭.") 
 
    .setFooter("Ajoute la fraise dans ton Jardin d'Eden ! ", member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })) 
 
    botslog.send(embed) 
 
})

bot.on ("guildMemberRemove", async member => { 
    //DELETE
    db.query(`DELETE FROM user WERE user = ${member.id}`)
 
    let botslog = member.guild.channels.cache.find(channel => channel.name === '『🖐』𝐀𝐮-𝐑𝐞𝐯𝐨𝐢𝐫') 
 
    let embed = new Discord.MessageEmbed() 
 
    .setAuthor(`La Fraise Gaming`, member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })) 

    .setColor('#ff0000')
 
    .setDescription("**Au revoir ! 🖐 ** \n A bientôt sur La Fraise Gaming !")
 
    .setFooter("Ajoute la fraise dans ton Jardin d'Eden ! ", member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
 
    botslog.send(embed) 
 
});


bot.on('messageReactionAdd', async(reaction, user) => {
    const message = reaction.message;
    const member = message.guild.members.cache.get(user.id);

    if(user.bot) return;

    if(
    ["📩", "🔒"].includes(reaction.emoji.name)
    ) {
        switch(reaction.emoji.name) {

            case "📩":
            
            if(reaction.message.channel.id !== "800472666087358484") return console.log('L\'émojis a été utiliser dans un autre salon')

            reaction.users.remove(user);

            let username = user.username;
            let categoryID = "809548487863566347";
            let channel = await message.guild.channels.create(`ticket-${username}`, {type: 'text', parent: message.guild.channels.cache.get(categoryID)})
            .catch(err => {
                message.channel.send('il y a eu une erreur dans le [MessageReactionAdd]')
            });

            channel.updateOverwrite(message.guild.roles.everyone, {'VIEW_CHANNEL': false});
            channel.updateOverwrite(member, {
                'VIEW_CHANNEL': true,
                'SEND_MESSAGES': true,
                'ADD_REACTIONS': true
            });
            channel.updateOverwrite(message.guild.roles.cache.find(role => role.name == 'STAFF'), {'VIEW_CHANNEL': true});

            var embed1 = new Discord.MessageEmbed()
            .setTitle('La Fraise Gaming | Assistance,')
            .setDescription('Bonjour / Bonsoir, si vous avez une question, un problème ou si vous ne souhaitez qu\'un renseignement, vous pouvez ouvrir un ticket pour discuter directement avec notre équipe, nous sommes disponibles très souvent et nous vous garantissons une réponse sous 24h maximum.\n Pour fermer le ticket, il vous suffit de cliquer sur la réaction ci dessous et le ticket sera fermée.')
            .setColor('#98fcae')
            
            channel.send(`${member}`)
            channel.send(embed1).then(async msg => msg.react('🔒'))
            let logchannel = message.guild.channels.cache.find(c => c.name == 'logsfraise')
            if(!logChannel) return;
            logchannel.send(`Un membre à créer un ticket. \n Voici le salon ${channel}`)
            break;

            case "🔒":

            if(!message.channel.name.startsWith('ticket')) return;
            if(!member.hasPermission('ADMINISTRATOR')) return;

            message.channel.delete()
            let logchannel2 = message.guild.channels.cache.find(c => c.name == 'logsfraise')
            if(!logChannel2) return;
            await logchannel2.send(`Un ticket vient d'être fermer. \n Voici le salon ${message.channel.name}`)

            message.channel.delete()
            break;
        }
    }
})

bot.on('channelCreate', channel => {
    if (!channel.guild) return
    const muteRole = channel.guild.roles.cache.find(role => role.name === 'Muted')
    if (!muteRole) return
    channel.createOverwrite(muteRole, {
        SEND_MESSAGES: false,
        CONNECT: false,
        ADD_REACTIONS: false
    })
})


bot.login(process.env.TOKEN)