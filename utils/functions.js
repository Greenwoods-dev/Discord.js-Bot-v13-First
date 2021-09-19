const Discord = require('discord.js');

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}

function generateHelpEmbed(guild) {
    let embeds = [];
    embeds.push(new Discord.MessageEmbed()
    .setColor("BLURPLE")
    .setTitle("This is my Help information!")
    .setDescription(`Hello i am ${guild.me.user.username} and i am a bruh bot! \n\n **These are my Commands:**`)
    .setThumbnail(guild.me.user.displayAvatarURL())
    .setFooter(guild.name, guild.iconURL({dynamic: true})))
    embeds.push(new Discord.MessageEmbed()
    .setColor("GREEN")
    .setTitle("💯 My utility commands!")
    .setThumbnail(guild.me.user.displayAvatarURL())
    .setFooter(guild.name, guild.iconURL({dynamic: true}))
    .addFields([
        {name: "**ping**", value: `> *Shows the ping of me*`, inline: true},
        {name: "**help**", value: `> *Gives you help*`, inline: true},
    ]))
    embeds.push(new Discord.MessageEmbed()
    .setColor("RED")
    .setTitle("🚫 My Admin commands!")
    .setThumbnail(guild.me.user.displayAvatarURL())
    .setFooter(guild.name, guild.iconURL({dynamic: true}))
    .addFields([
        {name: "**deploy**", value: `> *Adds the Slash Commands to this Server*`, inline: true},
        {name: "**prefix**", value: `> *Changes the prefix of your Server*`, inline: true},
    ]))
    return embeds;
};

module.exports.escapeRegex = escapeRegex;
module.exports.generateHelpEmbed = generateHelpEmbed;