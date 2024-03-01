const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Pong!'),
  run: async(bot, int) => {
    await int.reply('Pong!');
  }
}
