const Discord = require("discord.js");
const config = require("../config.json");

module.exports = client => {

    const { escapeRegex, generateHelpEmbed } = require("../utils/functions.js");

    // ! commands
    client.on("messageCreate", async (msg) => {
        if(!msg.guild || msg.author.bot) return;
        let { prefix } = config;
        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
        if (!prefixRegex.test(msg.content)) return;
        const [, matchedPrefix] = msg.content.match(prefixRegex);
        let args = msg.content.slice(matchedPrefix.length).trim().split(/ +/);
        let cmd = args.shift()?.toLowerCase(); // PinG --> ping

        if (cmd.length == 0) {
            if (matchedPrefix.includes(client.user.id)) {
                return msg.reply({embeds: [
                    new Discord.MessageEmbed().setColor("BLURPLE").setTitle(`:white_check_mark: **My prefix is: \`${prefix}\`**`)
                ]}).catch(console.error);
            }
        }

        if (cmd) {
            switch (cmd) {
                case "ping":
                    {
                        msg.reply("pinging the API...").then((message) => {
                            message.edit({content: `> **API PING:** \`${client.ws.ping}\`\n\n> **BOT PING:** \`${(Date.now() - message.createdTimestamp) - (2 * client.ws.ping)}\``}).catch(console.error);
                        }).catch(console.error);
                    }
                break;
                case "help":
                    {
                        const embed = generateHelpEmbed(msg.guild);
                        msg.reply({
                            embeds: [embed]
                        }).catch(console.error);
                    }
                break;
                case "deploy": {
                    msg.guild.commands.set(client.allSlashCommands).catch(console.error);
                    msg.reply(`:white_check_mark: Deployed ${client.allSlashCommands.length} Commands to ${msg.guild.name}`).catch(console.error);
                }
                break;
                default:
                    {
                        msg.reply(`:x: **Unknown command**`).catch(console.error);
                    }
                break;
            }
        }
        // !embed Title description
        // ["Title", "Description", "..."]
    });

    // Slash commands
    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isCommand()) return;
        const { member, channelId, guildId, applicationId,
            commandName, deffred, replied, ephemeral, options
            , id, createdTimestamp
        } = interaction;
        const { guild } = member;
        let channel = guild.channels.cache.get(channelId);

        switch (commandName) {
            case "ping": {
                let choice = interaction.options.getString("what_ping");
                if (!choice) {
                    interaction.reply({content: "pinging the API...", ephemeral: true}).then((inter) => {
                        interaction.editReply({content: `> **API PING:** \`${client.ws.ping}\`\n\n> **BOT PING:** \`${(Date.now() - createdTimestamp) - (2 * client.ws.ping)}\``, ephemeral: true}).catch(console.error);
                    }).catch(console.error);
                } else if (choice == "apiping") {
                    interaction.reply({content: `**API PING:** \`${client.ws.ping}\``, ephemeral: true}).catch(console.error);
                } else {
                    interaction.reply({content: "pinging the API...", ephemeral: true}).then((inter) => {
                        interaction.editReply({content: `> **API PING:** \`${client.ws.ping}\`\n\n> **BOT PING:** \`${(Date.now() - createdTimestamp) - (2 * client.ws.ping)}\``, ephemeral: true}).catch(console.error);
                    }).catch(console.error);
                }
            } break;
            case "help": {
                const embed = generateHelpEmbed(guild);
                interaction.reply({
                    embeds: [embed], ephemeral: true
                }).catch(console.error);
            } break;
        }
    });
};