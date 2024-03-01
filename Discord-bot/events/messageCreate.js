module.exports.run = async(bot, message) => {
  if(message.author.bot) return;
  if(message.content.startsWith(process.env.prefix)) {
    let args = message.content.slice(process.env.prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    let command = bot.commands.get(cmd) || bot.commands.find(x => x.aliases && x.aliases.includes(cmd));
    if(command) command.run(bot, message, args);
  }
}
