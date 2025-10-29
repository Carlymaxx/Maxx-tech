# Copilot Instructions for Maxx-tech WhatsApp Bot

## Project Overview
- **Maxx-tech** is a Node.js WhatsApp bot using the Baileys library for multi-device support, automation, and rich messaging features.
- The main entry point is `index.js`. Core logic is distributed across `commands/`, `handlers/`, and `whatsapp.js`.
- Session and authentication data are stored in `auth_info_baileys/`.
- The bot is designed for easy deployment on platforms like Railway, Heroku, Render, Vercel, and Termux.

## Key Components
- `index.js`: Main startup script, initializes the bot and loads configuration.
- `whatsapp.js`: Handles WhatsApp connection, message events, and Baileys integration.
- `commands/`: Contains modular command handlers. Each file implements a specific bot command.
- `handlers/`: Contains event and message handlers for custom logic.
- `generateSession.js`: Utility for generating WhatsApp session credentials.
- `config.js` & `config.env`: Store environment variables and bot configuration.
- `public/index.html`: (If present) Used for web-based status or session generation.

## Developer Workflows
- **Install dependencies:**
  ```sh
  npm install
  ```
- **Start the bot locally:**
  ```sh
  node index.js
  ```
- **Generate a new WhatsApp session:**
  ```sh
  node generateSession.js
  ```
- **Deploy:** Use platform-specific deploy buttons or scripts as described in the main `README.md`.

## Project Conventions
- **Commands:** Add new commands as separate files in `commands/`. Export a handler function.
- **Handlers:** Place custom event/message logic in `handlers/`.
- **Session Data:** Never commit files in `auth_info_baileys/` to public repos.
- **Configuration:** Use `config.env` for secrets and environment-specific settings.
- **Logging:** Use console logging or a custom logger if present.

## Integration & Patterns
- **Baileys** is the primary WhatsApp API client. All WhatsApp interactions go through it.
- **Session Management:** Sessions are persisted in `auth_info_baileys/` for seamless reconnects.
- **Web UI:** If `public/index.html` exists, it may provide a web interface for session management or status.

## Examples
- To add a new command, create `commands/echo.js`:
  ```js
  module.exports = {
    name: 'echo',
    execute: async (client, message, args) => {
      await client.sendMessage(message.from, { text: args.join(' ') });
    }
  };
  ```
- To handle a new event, add a handler in `handlers/` and require it in `index.js` or `whatsapp.js`.

## References
- See `README.md` for deployment, features, and live demo links.
- See `whatsapp-baileys-bot/README.md` for Baileys-specific structure and usage.

---
For questions about unclear patterns or missing documentation, ask for clarification or check the latest `README.md`.
