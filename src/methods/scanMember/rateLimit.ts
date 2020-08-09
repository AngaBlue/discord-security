import { GuildMember } from "discord.js";
import { ban } from "../ban";
import { MemberJoinEntry } from "./duplicateAvatar";

let rateLimits: {
    //Index by Guild ID
    [index: string]: (MemberJoinEntry & { member: string })[];
} = {};

const limit = 3;
const time = 60 * 1000;

export default async function (member: GuildMember): Promise<boolean> {
    if (!rateLimits[member.guild.id]) rateLimits[member.guild.id] = [];
    const guildLimits = rateLimits[member.guild.id];
    guildLimits.push({ member: member.id, joined: Date.now(), banned: false });
    if (guildLimits.length >= limit && guildLimits[guildLimits.length - limit].joined > Date.now() - time) {
        for (let i = guildLimits.length - limit; i < guildLimits.length; i++) {
            if (!guildLimits[i].banned) {
                let user = member.guild.members.resolve(guildLimits[i].member);
                await ban(user, `New User Rate Limit`);
                guildLimits[i].banned = true;
            }
        }
        return true;
    }
    return false;
}
