import { GuildMember, Collection } from "discord.js";
import { ban } from "../ban";

export interface MemberJoinEntry {
    joined: number;
    banned: boolean;
}

let avatarLog: {
    //Guild ID
    [index: string]: {
        //Normalized Name
        [index: string]: Collection<string, MemberJoinEntry>;
    };
} = {};

export default async function (member: GuildMember): Promise<boolean> {
    if (!member.user.avatar) return false;
    const avatar = member.user.avatar;
    //Initialise Guild + Name Collections
    if (!avatarLog[member.guild.id]) avatarLog[member.guild.id] = {};
    if (!avatarLog[member.guild.id][avatar]) avatarLog[member.guild.id][avatar] = new Collection();
    //Add Member Record
    let members = avatarLog[member.guild.id][avatar];
    members.set(avatar, {
        joined: Date.now(),
        banned: false
    });
    //If Account w/ Same Name in Last 5 Minutes
    if (members.size > 1 && members.array()[members.size - 2].joined > Date.now() - 5 * 60 * 1000) {
        //Ban Recent
        let membersToBan = [members.keyArray()[members.size - 2], members.keyArray()[members.size - 1]];
        for (let id of membersToBan) {
            await ban(await member.guild.members.fetch(id), "Duplicate Avatar");
            members.set(id, { ...members.get(id), banned: true });
        }
        return true;
    }
    return false;
}
