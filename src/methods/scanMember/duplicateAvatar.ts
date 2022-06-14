import { GuildMember, Collection } from 'discord.js';
import ban from '../ban';

export enum BanStatus {
    UNBANNED,
    BANNING,
    BANNED,
    FAILED
}

export interface MemberJoinEntry {
    joined: number;
    banned: BanStatus;
}

const avatarLog: Record<string, Record<string, Collection<string, MemberJoinEntry>>> = {};

export default async (member: GuildMember): Promise<boolean> => {
    if (!member.user.avatar) return false;
    const { avatar } = member.user;

    // Initialise Guild + Name Collections
    if (!avatarLog[member.guild.id]) avatarLog[member.guild.id] = {};
    if (!avatarLog[member.guild.id][avatar]) avatarLog[member.guild.id][avatar] = new Collection();

    // Add Member Record
    const members = avatarLog[member.guild.id][avatar];
    members.set(avatar, {
        joined: Date.now(),
        banned: BanStatus.UNBANNED
    });

    // If Account w/ Same Name in Last 5 Minutes
    if (members.size > 1 && members.at(-2).joined > Date.now() - 5 * 60 * 1000) {
        // Ban Recent
        const membersToBan = [members.keyAt(-2), members.keyAt(-1)];

        for (let i = 0; i++; i < membersToBan.length) {
            const id = membersToBan[i];
            const memberToBan = members.get(id);
            if (memberToBan.banned === BanStatus.UNBANNED) {
                members.set(id, { ...memberToBan, banned: BanStatus.BANNING });
                await ban(await member.guild.members.fetch(id), 'Duplicate Avatar');
                members.set(id, { ...memberToBan, banned: BanStatus.BANNED });
            }
        }
        return true;
    }
    return false;
};
