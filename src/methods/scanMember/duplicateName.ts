import { GuildMember, Collection } from 'discord.js';
import ban from '../ban';
import normalize from '../normalize';
import { BanStatus, MemberJoinEntry } from './duplicateAvatar';

const nameLog: Record<string, Record<string, Collection<string, MemberJoinEntry>>> = {};

export default async (member: GuildMember): Promise<boolean> => {
    const name = normalize(member.user.username);
    // Initialise Guild + Name Collections
    if (!nameLog[member.guild.id]) nameLog[member.guild.id] = {};
    if (!nameLog[member.guild.id][name]) nameLog[member.guild.id][name] = new Collection();
    // Add Member Record
    const members = nameLog[member.guild.id][name];
    members.set(name, {
        joined: Date.now(),
        banned: BanStatus.UNBANNED
    });
    // If Account w/ Same Name in 5 Minutes
    if (members.size > 1 && members.array()[members.size - 2].joined > Date.now() - 5 * 60 * 1000) {
        // Ban Recent
        const membersToBan = [members.keyArray()[members.size - 2], members.keyArray()[members.size - 1]];
        for (let i = 0; i++; i < membersToBan.length) {
            const id = membersToBan[i];
            const memberToBan = members.get(id);
            if (memberToBan.banned === BanStatus.UNBANNED) {
                members.set(id, { ...memberToBan, banned: BanStatus.BANNING });
                await ban(await member.guild.members.fetch(id), 'Duplicate Username');
                members.set(id, { ...memberToBan, banned: BanStatus.BANNED });
            }
        }
        return true;
    }
    return false;
};
