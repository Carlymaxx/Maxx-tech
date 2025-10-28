# WhatsApp Baileys Bot

This project is a WhatsApp bot built using the Baileys library. It allows you to interact with WhatsApp programmatically, handling incoming messages and responding to commands.

## Features

- Connects to WhatsApp using the Baileys library.
- Handles incoming messages and commands.
- Responds to a simple "ping" command with "pong".
- Provides logging functionality for monitoring bot activity.

## Project Structure

```
whatsapp-baileys-bot
├── src
│   ├── index.ts               # Entry point of the bot application
│   ├── bot.ts                 # Bot lifecycle management
│   ├── commands
│   │   └── ping.ts           # Command handler for "ping"
│   ├── handlers
│   │   ├── messageHandler.ts  # Incoming message processing
│   │   └── connectionHandler.ts# Connection status management
│   ├── lib
│   │   └── baileysClient.ts   # Wrapper for Baileys library functionality
│   ├── sessions
│   │   └── .gitkeep           # Keeps sessions directory in version control
│   ├── utils
│   │   └── logger.ts          # Logging functionality
│   └── types
│       └── index.ts           # Interfaces and types used in the project
├── package.json                # npm configuration file
├── tsconfig.json               # TypeScript configuration file
├── .env                        # Environment variables
├── .gitignore                  # Git ignore file
└── README.md                   # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd whatsapp-baileys-bot
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your WhatsApp credentials and API keys.

## Usage

To start the bot, run:
```
npm start
```

The bot will connect to WhatsApp and begin listening for incoming messages.

## Contributing

Feel free to submit issues or pull requests to improve the bot's functionality or documentation.