require('dotenv').config();

const discord = require('discord.js'),
  bot = new discord.Client({ intents: [discord.GatewayIntentBits.Guilds, discord.GatewayIntentBits.GuildMessages, discord.GatewayIntentBits.MessageContent, discord.GatewayIntentBits.GuildMembers]});

bot.commands = new discord.Collection();
bot.slash = new discord.Collection();

for(let x of ['events', 'cmds', 'slash']) require(`./handlers/${x}`)(bot);

bot.login(process.env.token)
