const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = (client) => {
    const pingCommand = new SlashCommandBuilder()
        .setName(`ping`)
        .setDescription("Shows the ping of me.")
        .addStringOption(option => {
            option.setName("what_ping")
            .setDescription("What type of ping do you want to know?")
            .setRequired(false)
            .addChoices([
                ["Api Ping", "apiping"],
                ["Bot Ping", "botping"]
            ])
        return option;
    });
    const helpCommand = new SlashCommandBuilder()
        .setName(`help`)
        .setDescription("Gives you help about me");

    client.allSlashCommands.push(pingCommand.toJSON(), helpCommand.toJSON());

    return true;
}