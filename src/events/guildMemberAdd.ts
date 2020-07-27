import { client } from "..";
import filter from "../filter";
import { ban } from "../methods/ban";
import { GuildMember, Collection } from "discord.js";

type MemberJoinEntry = {
    guild: string;
    joined: number;
    banned: boolean;
}

let nameLog: {
    [index: string]: {
        [index: string]: Collection<string, MemberJoinEntry>
    };
} = {};

const hour = 1000 * 60 * 60;

client.on("guildMemberAdd", async (member) => {
    member = member as GuildMember;
    //Banned Words
    const name = member.displayName.toLowerCase();
    for (let test of filter) {
        if (name.search(test) !== -1) return ban(member, `Filter violation: \`${test}\``);
    }
    // *** Multiple Same Name Accounts ***
    //Initialise Guild + Name Collections
    if (!nameLog[member.guild.id]) nameLog[member.guild.id] = {}
    if (!nameLog[member.guild.id][member.id]) nameLog[member.guild.id][member.id] = new Collection();
    //Add Member Record
    let members = nameLog[member.guild.id][member.id]
    members.set(member.id, {
        guild: member.guild.id,
        joined: Date.now(),
        banned: false
    });
    //If Account w/ Same Name in Last Hour
    if (members.size > 1 && members.array()[members.size - 2].joined > Date.now() - hour) {
        //Ban Recent
        let membersToBan = [members.keyArray()[members.size - 2], members.keyArray()[members.size - 1]]
        for (let id of membersToBan) {
            await ban(await member.guild.members.fetch(id), "Duplicate username");
            members.set(id, { ...members.get(id), banned: true });
        }
    }
});
