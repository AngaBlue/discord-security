import { client, config } from "..";
import { GuildMember, TextChannel, RichEmbed } from "discord.js";

export async function ban(member: GuildMember, violation: string) {
    const logChannel = client.channels.get(config.logChannel) as TextChannel;
    try {
        await member.ban("Giveaway Account");
        logChannel.send(
            new RichEmbed()
                .setTitle("Member Auto Banned")
                .setColor(0xff4040)
                .addField("Server", member.guild.name, true)
                .addField("Member", `${member}\n${member.user.tag}\n${member.id}`, true)
                .addField("Violation", violation)
                .setFooter("bad boi banner")
        );
    } catch (error) {
        logChannel.send(
            new RichEmbed()
                .setTitle("Error")
                .setColor(0xff4040)
                .addField("Error", "Failed to auto ban.")
                .addField("Server", member.guild.name, true)
                .addField("Member", `${member}\n${member.user.tag}\n${member.id}`, true)
                .setFooter("bad boi banner")
        );
    }
}
