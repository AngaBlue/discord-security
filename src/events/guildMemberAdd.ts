import { client } from "..";
import { GuildMember } from "discord.js";
import scanMember from "../methods/scanMember";

client.on("guildMemberAdd", async (member) => {
    member = member as GuildMember;
    //!!!Add Account age Check
    scanMember(member);
});
