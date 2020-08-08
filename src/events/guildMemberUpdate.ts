import { client } from "..";
import { GuildMember } from "discord.js";
import scanMember from "../methods/scanMember";

client.on("guildMemberUpdate", async (old, updated) => {
    if (old.user.displayAvatarURL() === updated.user.displayAvatarURL() && old.user.username === updated.user.username)
        return;
    scanMember(updated as GuildMember);
});
