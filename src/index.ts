import Discord from 'discord.js';
import config from './config.json';

// Bind Events
import './events';

const client = new Discord.Client();
export { client, config };

client.login(config.token);
