const Discord = require('discord.js')

module.exports.run = async(bot, message, args) => {

let ParametreEmbed = new Discord.MessageEmbed()
        .setAuthor('⚙️ Paramètre du bot :')
        .setThumbnail(message.guild.iconURL({dynamic: true, size: 512}))
        .addField('❗ Préfix : \`!\`', '→ A ajouter au début de votre commande.')
        .addField('🌎 Langue : Francais 🇫🇷', '→ Il ne vous parlera pas...')
        .addField('🍓 Nom : Fraise', '→ On la mange aussi')
        .addField('💼 Multifonction : modération, informations', '→ Bientôt musique ;)')
        .addField('🤖 Rôle : BOT', '→ Je vous rassure il n\'est pas vivant')
        .addField('🕛 Temps : 24/24' , '→ Sauf si problème ou en cas')
        .addField('📌 Vous pouvez faire : \n\n➡️Ajouter le Bot \n➡️Allez sur notre site ( ) \n➡️Rejoindre le Discord (https://discord.gg/PErEdfYjK6)', '→ Donnez votre avis sur le bot etc...')
        .addField('🥂 Rejoindre le discord pourquoi ? : \n\n➡️Avoir de l\'aide au niveau du bot. \n➡️Avoir les nouveautées du bot.', '→ Ca ne mange pas de pain.')
        .addField('🎮 C\'est aussi un serveur pour le gaming : \n\n➡️Avoir Accès à de nombreux jeux et proposer votre jeu !', '→ Pour participer aux évenements, tournoi...')
        .setFooter('Pour en savoir plus sur les commandes, utiliser : !help')
        .setColor('#fd0000')

        message.channel.send(ParametreEmbed)
}

module.exports.config = {
    name: "infos"
}