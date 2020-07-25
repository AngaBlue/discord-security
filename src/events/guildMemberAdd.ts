import { client } from "..";
import filter from "../filter";
import { ban } from "../methods/ban";

let newMembers: {
    [index: string]: {
        id: string;
        guild: string;
        joined: number;
        banned: boolean;
    }[];
} = {};

const hour = 1000 * 60 * 60;

client.on("guildMemberAdd", async (member) => {
    //Banned Words
    const name = member.displayName.toLowerCase();
    for (let test of filter) {
        if (name.search(test) !== -1) return ban(member, `Filter violation: \`${test}\``);
    }
    //Multiple Same Name Accounts
    newMembers[member.displayName] = newMembers[member.displayName] || [];
    newMembers[member.displayName].push({
        id: member.id,
        guild: member.guild.id,
        joined: Date.now(),
        banned: false
    });
    //If Account w/ Same Name in Last Hour
    if (
        newMembers[member.displayName].length > 1 &&
        newMembers[member.displayName][newMembers[member.displayName].length - 2].joined > Date.now() - hour
    ) {
        //Ban All Recent Accounts with Same Name
        for (let i in newMembers[member.displayName]) {
            let entry = newMembers[member.displayName][i];
            if (!entry.banned && entry.joined > Date.now() - hour) {
                await ban(client.guilds.get(entry.guild).members.get(entry.id), "Duplicate username");
                entry.banned = true;
            }
        }
    }
});
