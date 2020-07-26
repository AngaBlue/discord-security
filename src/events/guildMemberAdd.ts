import { client } from "..";
import filter from "../filter";
import { ban } from "../methods/ban";
import { GuildMember } from "discord.js";

let nameLog: {
    [index: string]: {
        id: string;
        guild: string;
        joined: number;
        banned: boolean;
    }[];
} = {};

const hour = 1000 * 60 * 60;

client.on("guildMemberAdd", async (member) => {
    member = member as GuildMember;
    //Banned Words
    const name = member.displayName.toLowerCase();
    for (let test of filter) {
        if (name.search(test) !== -1) return ban(member, `Filter violation: \`${test}\``);
    }
    //Multiple Same Name Accounts
    nameLog[member.displayName] = nameLog[member.displayName] || [];
    if (!nameLog[member.displayName].find((m) => m.id === member.id))
        nameLog[member.displayName].push({
            id: member.id,
            guild: member.guild.id,
            joined: Date.now(),
            banned: false
        });
    //If Account w/ Same Name in Last Hour
    let members = nameLog[member.displayName];
    if (members.length > 1 && members[members.length - 2].joined > Date.now() - hour) {
        //Ban All Recent Accounts with Same Name
        for (let i in members) {
            let entry = members[i];
            if (!entry.banned && entry.joined > Date.now() - hour) {
                await ban(await client.guilds.resolve(entry.guild).members.fetch(entry.id), "Duplicate username");
                entry.banned = true;
            }
        }
    }
});
