import { GuildMember } from "discord.js";
import { ban } from "../ban";
import normalize from "../normalize";
import { name as blacklist } from "../../blacklist";

const week = 7 * 24 * 60 * 60 * 1000

export default function (member: GuildMember): boolean {
    if (member.user.createdTimestamp < (Date.now() - (2 * week))) return false;
    const name = normalize(member.user.username);
    for (let test of blacklist) {
        if (name.search(test) !== -1) {
            ban(member, `Name Filter Violation: \`${test}\``);
            return true;
        }
    }
    return false;
}
