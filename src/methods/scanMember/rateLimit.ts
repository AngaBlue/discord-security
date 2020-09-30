import { GuildMember } from "discord.js";
import { ban } from "../ban";
import { BanStatus, MemberJoinEntry } from "./duplicateAvatar";

let rateLimits: {
    //Index by Guild ID
    [index: string]: (MemberJoinEntry & { member: string })[];
} = {};

const limit = 3;
const time = 30 * 1000;

export default async function (member: GuildMember): Promise<boolean> {
    if (!rateLimits[member.guild.id]) rateLimits[member.guild.id] = [];
    const guildLimits = rateLimits[member.guild.id];
    guildLimits.push({ member: member.id, joined: Date.now(), banned: BanStatus.UNBANNED });
    if (guildLimits.length >= limit && guildLimits[guildLimits.length - limit].joined > Date.now() - time) {
        for (let i = guildLimits.length - limit; i < guildLimits.length; i++) {
            if (guildLimits[i].banned === BanStatus.UNBANNED) {
                let user = member.guild.members.resolve(guildLimits[i].member);
                guildLimits[i].banned = BanStatus.BANNING;
                await ban(user, `New User Rate Limit`);
                guildLimits[i].banned = BanStatus.BANNED;
            }
        }
        return true;
    }
    return false;
}
