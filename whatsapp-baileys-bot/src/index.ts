import { BaileysClient } from './lib/baileysClient';
import { handleMessage } from './handlers/messageHandler';
import { handleConnection } from './handlers/connectionHandler';

const client = new BaileysClient();

client.on('message', handleMessage);
client.on('connection.update', handleConnection);

client.connect();