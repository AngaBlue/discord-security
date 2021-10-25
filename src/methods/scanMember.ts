import { GuildMember } from 'discord.js';
import blacklistName from './scanMember/blacklistName';
import blacklistAvatar from './scanMember/blacklistAvatar';
import duplicateAvatar from './scanMember/duplicateAvatar';
import duplicateName from './scanMember/duplicateName';

export default async function scanMember(member: GuildMember): Promise<void> {
    // Process Avatar Hashes First as they involve less processing
    if (blacklistAvatar(member)) return;
    if (blacklistName(member)) return;
    if (await duplicateAvatar(member)) return;
    await duplicateName(member);
}
