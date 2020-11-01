import { GuildMember } from "discord.js";
import { avatar as blacklist } from "../../blacklist";
import ban from "../ban";

export default function (member: GuildMember): boolean {
    if (!member.user.avatar) return false;
    const avatar = member.user.avatar;
    for (const test of blacklist) {
        if (avatar.search(test) !== -1) {
            ban(member, `Avatar Filter Violation: \`${test}\``);
            return true;
        }
    }
    return false;
}
