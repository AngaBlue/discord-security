import { GuildMember, Collection } from "discord.js";
import { ban } from "../ban";
import normalize from "../normalize";
import { BanStatus, MemberJoinEntry } from "./duplicateAvatar";

let nameLog: {
    //Guild ID
    [index: string]: {
        //Normalized Name
        [index: string]: Collection<string, MemberJoinEntry>;
    };
} = {};

const hour = 1000 * 60 * 60;

export default async function (member: GuildMember): Promise<boolean> {
    const name = normalize(member.user.username);
    //Initialise Guild + Name Collections
    if (!nameLog[member.guild.id]) nameLog[member.guild.id] = {};
    if (!nameLog[member.guild.id][name]) nameLog[member.guild.id][name] = new Collection();
    //Add Member Record
    let members = nameLog[member.guild.id][name];
    members.set(name, {
        joined: Date.now(),
        banned: BanStatus.UNBANNED
    });
    //If Account w/ Same Name in Last Hour
    if (members.size > 1 && members.array()[members.size - 2].joined > Date.now() - 5 * 60 * 1000) {
        //Ban Recent
        let membersToBan = [members.keyArray()[members.size - 2], members.keyArray()[members.size - 1]];
        for (let id of membersToBan) {
            let memberToBan = members.get(id)
            if (memberToBan.banned === BanStatus.UNBANNED) {
                members.set(id, { ...memberToBan, banned: BanStatus.BANNING });
                await ban(await member.guild.members.fetch(id), "Duplicate Username");
                members.set(id, { ...memberToBan, banned: BanStatus.BANNED });
            }
        }
        return true;
    }
    return false;
}
