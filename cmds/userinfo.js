const Discord = require('discord.js')
const mysql = require('mysql');

const db = mysql.createConnection({
    host:'localhost',
    password:'',
    user:'root',
    database:'FraiseBot'
})
module.exports.run = async(bot, message, args) => {

    //SELECTIONNER DES INFOS
    db.query(`SELECT * FROM user WHERE user = ${message.author.id}`, async (err, req) => {

    let UserEmbed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag)
    .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 512}))
    .addField('Nom de l\'utilisateur', `${message.author.username}`)
    .addField('Tag', message.author.discriminator)
    .addField('ID', message.author.id)
    .addField('Status', message.author.presence.status)
    .addField('Compte créer le', message.author.createdAt)
    .addField('Information de la base de données', '-----------------------')
    .addField('Id enregistré', req[0].user)
    .addField('Username enregistré', req[0].username)
    .addField('Message enregistré', req[0].message)
    .setFooter('Information sur vous')
    .setColor('RANDOM')

    message.channel.send(UserEmbed)
    })
}

module.exports.config = {
    name: "userinfo"
}
