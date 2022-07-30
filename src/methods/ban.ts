import { GuildMember, TextChannel, EmbedBuilder } from 'discord.js';
import { client, config } from '..';

/**
 * Bans a member from the guild and logs the ban to the logs channel.
 * @param {GuildMember} member Member to ban
 * @param {string} violation Reason as to why this member is being banned
 */
async function ban(member: GuildMember, violation: string): Promise<void> {
    if (!member) return;
    // If Verified Bot, Don't Ban
    if (member.user.bot) return;
    const logChannel = (await client.channels.fetch(config.logChannel)) as TextChannel;
    try {
        await member.ban({ reason: `Auto Ban: ${violation}` });

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Member Auto Banned', iconURL: client.user.displayAvatarURL() })
            .setColor(0xff4040)
            .setThumbnail(member.user.displayAvatarURL())
            .addFields([{ name: 'Server', value: member.guild.name }, { name: 'Member', value: `${member}\n**Tag**: ${member.user.tag}\n**ID:** ${member.id}` }, { name: 'Violation', value: violation }])
            .setFooter({ text: 'Discord Security' })
            .setTimestamp(Date.now());

        logChannel.send({ embeds: [embed] });
    } catch (error) {
        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Error', iconURL: client.user.displayAvatarURL() })
            .setColor(0xff4040)
            .addFields([{ name: 'Error', value: 'Failed to auto ban.'}, { name: 'Server', value: member.guild.name }, { name: 'Member', value: `${member}\n**Tag**: ${member.user.tag}\n**ID:** ${member.id}` }, { name: 'Violation', value: violation }])
            .setFooter({ text: 'Discord Security' })
            .setTimestamp(Date.now());

        logChannel.send({ embeds: [embed] });
    }
}

export default ban;
