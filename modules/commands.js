const Discord = require("discord.js");
const config = require("../config.json");

module.exports = client => {

    const { escapeRegex, generateHelpEmbed } = require("../utils/functions.js");

    // ! commands
    client.on("messageCreate", async (msg) => {
        if(!msg.guild || msg.author.bot) return;

        client.settings.ensure(msg.guild.id, {
            prefix: config.prefix
        });

        let prefix = client.settings.get(msg.guild.id, `prefix`);

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
                case "prefix": 
                    {
                        if (!msg.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_GUILD)) {
                            return msg.reply({embeds: [
                                new Discord.MessageEmbed().setColor("RED").setTitle(`:x: **You are not allowed to run this Command**`)
                            ]}).catch(console.error);
                        }
                        if (!args[0]) {
                            return msg.reply({embeds: [
                                new Discord.MessageEmbed().setColor("RED").setTitle(`:x: **You need to specify what the prefix should be**`)
                            ]}).catch(console.error);
                        }
                        // Change the prefix settings
                        client.settings.set(msg.guild.id, args[0], "prefix");
                        // send success message
                        return msg.reply({embeds: [
                            new Discord.MessageEmbed().setColor("BLURPLE").setTitle(`:white_check_mark: **Successfully changed the prefix to: \`${args[0]}\`**`)
                        ]}).catch(console.error);
                    } 
                break;
                case "ping":
                    {
                        msg.reply("pinging the API...").then((message) => {
                            message.edit({content: `> **API PING:** \`${client.ws.ping}\`\n\n> **BOT PING:** \`${(Date.now() - message.createdTimestamp) - (2 * client.ws.ping)}\``}).catch(console.error);
                        }).catch(console.error);
                    }
                break;
                case "help":
                    {
                        const embeds = generateHelpEmbed(msg.guild);
                        msg.reply({
                            embeds: embeds
                        }).catch(console.error);
                    }
                break;
                case "deploy": {
                    if (!msg.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_GUILD)) {
                        return msg.reply({embeds: [
                            new Discord.MessageEmbed().setColor("RED").setTitle(`:x: **You are not allowed to run this Command**`)
                        ]}).catch(console.error);
                    }
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
                const embeds = generateHelpEmbed(guild);
                interaction.reply({
                    embeds: embeds, ephemeral: true
                }).catch(console.error);
            } break;
        }
    });
};