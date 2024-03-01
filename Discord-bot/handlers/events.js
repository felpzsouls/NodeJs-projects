const { readdirSync } = require('fs');

module.exports = async(bot) => {
  let path = readdirSync('./events/').filter(x => x.endsWith('.js'));

  for (let file of path) {
    let event = require('../events/' + file)
    
    event.name = event.name || file.replace('.js', '');

    bot.on(event.name, event.run.bind(null, bot));
  }
}
