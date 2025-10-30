const fs = require('fs');
const path = require('path');

module.exports = (bot) => {
  bot.commands = new Map();

  const commandsPath = path.join(__dirname, '../commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    if (command.name) {
      bot.commands.set(command.name, command);
      console.log(`✅ Loaded command: ${command.name}`);
    }
  }
};