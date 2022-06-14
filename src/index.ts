import Discord from 'discord.js';
import config from './config.json';

// Bind Events
import './events';

const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'] });
export { client, config };

client.login(config.token);
