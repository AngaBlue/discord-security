import { GuildMember } from 'discord.js';
import ban from '../ban';
import { BanStatus, MemberJoinEntry } from './duplicateAvatar';

const rateLimits: {
    // Index by Guild ID
    [index: string]: (MemberJoinEntry & { member: string })[];
} = {};

const limit = 3;
const time = 30 * 1000;

export default async (member: GuildMember): Promise<boolean> => {
    // Create guild ratelimit entry
    if (!rateLimits[member.guild.id]) rateLimits[member.guild.id] = [];
    // Add member entry
    const guildLimits = rateLimits[member.guild.id];
    guildLimits.push({ member: member.id, joined: Date.now(), banned: BanStatus.UNBANNED });

    // Detect ratelimit
    if (guildLimits.length >= limit && guildLimits[guildLimits.length - limit].joined > Date.now() - time) {
        // Loop through each member affected
        for (let i = guildLimits.length - limit; i < guildLimits.length; i++) {
            // Check to make sure the system hasn't already banned this user
            if (guildLimits[i].banned === BanStatus.UNBANNED) {
                const user = member.guild.members.resolve(guildLimits[i].member);
                // eslint-disable-next-line no-continue
                if (!user) continue;
                guildLimits[i].banned = BanStatus.BANNING;
                await ban(user, 'New User Rate Limit');
                guildLimits[i].banned = BanStatus.BANNED;
            }
        }
        return true;
    }
    return false;
};
