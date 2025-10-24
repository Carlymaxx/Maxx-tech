const fs = require("fs");
const path = require("path");

const commands = new Map();

// Load all command files
const commandFiles = fs.readdirSync(path.join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.set(command.name, command);
}

module.exports = {
  commands
};