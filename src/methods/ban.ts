import { client, config } from "..";
import { GuildMember, TextChannel, MessageEmbed } from "discord.js";

export async function ban(member: GuildMember, violation: string) {
    const logChannel = (await client.channels.fetch(config.logChannel)) as TextChannel;
    try {
        await member.ban({ reason: `Auto Ban: ${violation}` });
        logChannel.send(
            new MessageEmbed()
                .setAuthor("Member Auto Banned", client.user.displayAvatarURL() )
                .setColor(0xff4040)
                .setThumbnail(member.user.displayAvatarURL())
                .addField("Server", member.guild.name)
                .addField("Member", `${member}\n**Tag**: ${member.user.tag}\n**ID:** ${member.id}`)
                .addField("Violation", violation)
                .setFooter("bad boi banner")
                .setTimestamp(Date.now())
        );
    } catch (error) {
        logChannel.send(
            new MessageEmbed()
                .setAuthor("Error", client.user.displayAvatarURL())
                .setColor(0xff4040)
                .addField("Error", "Failed to auto ban.")
                .addField("Server", member.guild.name)
                .addField("Member", `${member}\n${member.user.tag}\n${member.id}`)
                .setFooter("bad boi banner")
                .setTimestamp(Date.now())
        );
    }
}
