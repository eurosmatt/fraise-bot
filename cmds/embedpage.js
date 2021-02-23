const  { MessageEmbed } = require('discord.js');
const { Menu } = require('discord.js-menu');

/*
Page 1 - Aceuil
Page 2 - Commandes
Page 3 - Informations
*/
module.exports.run = async (bot, message, args) => {
    console.log(message)
let helpMenu = new Menu(message.channel, message.author.id, [
    {
        name: 'main',
        content: new MessageEmbed()
        .setTitle('Acceuil')
        .setFooter('Page 1/3')
        ,
        reactions:{
        '▶': "next"
        }
        },
    {
        name: "otherPage",
        content: new MessageEmbed()
        .setTitle('Commande')
        .setFooter('Page 2/3')
        ,
        reactions:{  
        '◀': 'previous', 
        '▶': "next"
    }
    },
    {
        name: "otherPage",
        content: new MessageEmbed()
        .setTitle('Information')
        .setFooter('Page 3/3')
        ,
        reactions:{  
        '◀': 'previous'
    }
    },
    ], 300000)
        helpMenu.start()
}

module.exports.config = {
    name : 'embedpage'
    }