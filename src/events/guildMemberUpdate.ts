import { GuildMember } from 'discord.js';
import { client } from '..';
import scanMember from '../methods/scanMember';

client.on('guildMemberUpdate', async (old, updated) => {
    if (updated.user.bot) return;
    if (old.user.displayAvatarURL() === updated.user.displayAvatarURL() && old.user.username === updated.user.username) return;
    scanMember(updated as GuildMember);
});
