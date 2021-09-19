const Discord = require('discord.js');

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}

function generateHelpEmbed(guild) {
    return new Discord.MessageEmbed()
    .setColor("BLURPLE")
    .setTitle("My first embed")
    .setDescription(`Hello i am ${client.user.username} and i am a bruh bot! \n\n **These are my Commands:**`)
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter(guild.name, guild.iconURL({dynamic: true}))
    .addFields([
        {name: "**ping**", value: `> *Shows the ping of me*`, inline: true},
        {name: "**help**", value: `> *Gives you help*`, inline: true},
        {name: "**deploy**", value: `> *Adds the Slash Commands to this Server*`, inline: true},
    ])
};

module.exports.escapeRegex = escapeRegex;
module.exports.generateHelpEmbed = generateHelpEmbed;