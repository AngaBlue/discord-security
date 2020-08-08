import { GuildMember } from "discord.js";
import { ban } from "../ban";
import normalize from "../normalize";
import { name as blacklist } from "../../blacklist";

export default function (member: GuildMember): boolean {
    const name = normalize(member.user.username);
    for (let test of blacklist) {
        if (name.search(test) !== -1) {
            ban(member, `Name Filter Violation: \`${test}\``);
            return true;
        }
    }
    return false;
}
