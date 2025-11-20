import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commandDir = path.join(__dirname, "../commands");
const commands = new Map();

export async function loadCommands() {
  const files = fs.readdirSync(commandDir).filter(f => f.endsWith(".js"));

  for (const file of files) {
    const { default: command } = await import(path.join(commandDir, file));
    if (command?.name && typeof command.execute === "function") {
      commands.set(command.name.toLowerCase(), command);
    }
  }

  console.log(`✅ Loaded ${commands.size} command(s)`);
}

export function getCommand(name) {
  return commands.get(name.toLowerCase());
}
