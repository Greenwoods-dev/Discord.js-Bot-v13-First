const Discord = require('discord.js');
const config = require('./config.json');
const fs = require("fs");
const { ClientOptions } = require("../Bot1/utils/clientOptions.js");

const client = new Discord.Client(ClientOptions);
// Create slash commands Object
client.allSlashCommands = [];
require("./utils/slashCommandsBuilder.js")(client);

// Load events
fs.readdirSync("./modules/").forEach((dir) => {
    if (fs.existsSync(`./modules/${dir}`) && fs.lstatSync(`./modules/${dir}`).isDirectory()) {
        for (let file of fs.readdirSync(`./modules/${dir}/`).filter(file => file.endsWith(".js"))) {
            try {
                require(`./modules/${dir}/${file}`)(client);
                console.log(`[X] :: LOADED: ./modules/${dir}/${file}`);
            } catch (e) { console.log(e); }
        }
    } else {
        try {
            require(`./modules/${dir}`)(client);
            console.log(`[X] :: LOADED: ./modules/${dir}`);
        } catch (e) { console.log(e); }
    }
})

// login using the token
client.login(config.token);