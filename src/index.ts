import Discord from 'discord.js';
import config from './config.json';

const client = new Discord.Client({ intents: ['Guilds', 'GuildMembers', 'GuildBans'] });
export { client, config };

// Bind Events
import('./events');

client.login(config.token);
