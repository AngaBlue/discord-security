import Discord from 'discord.js';
import config from './config.json';

// Bind Events
import './events';

const client = new Discord.Client({ intents: ['Guilds', 'GuildMembers', 'GuildBans'] });
export { client, config };

client.login(config.token);
