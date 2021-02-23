const Discord = require('discord.js')
const mysql = require('mysql');

const db = mysql.createConnection({
    host:'localhost',
    password:'',
    user:'root',
    database:'FraiseBot'
})
module.exports.run = async(bot, message, args) => {

    //UPDATE
    let result = args[0];
    db.query(`UPDATE user SET message = '${result}' WHERE user = ${message.author.id}`)
}

module.exports.config = {
    name: "updateuser"
}