const { readdirSync } = require('fs')

module.exports = async(bot) => {
  let path = readdirSync('./cmds/').filter(x => x.endsWith('.js'));

  for(let file of path) {
    let cmd = require(`../cmds/${file}`)

    bot.commands.set(cmd.name, cmd);
  }
}
