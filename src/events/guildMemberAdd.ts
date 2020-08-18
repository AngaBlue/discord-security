import { client } from "..";
import { GuildMember } from "discord.js";
import scanMember from "../methods/scanMember";
import rateLimit from "../methods/scanMember/rateLimit";

const week = 7 * 24 * 60 * 60 * 1000

client.on("guildMemberAdd", async (member) => {
    member = member as GuildMember;
    if (member.user.bot) return;
    //If not Rate Limit Banned, Continue Checks
    if (member.user.createdTimestamp > Date.now() - (2 * week) && await rateLimit(member)) return;
    scanMember(member);
});
