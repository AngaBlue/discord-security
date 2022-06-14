import { GuildMember, TextChannel, MessageEmbed } from 'discord.js';
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

        const embed = new MessageEmbed()
            .setAuthor({ name: 'Member Auto Banned', iconURL: client.user.displayAvatarURL() })
            .setColor(0xff4040)
            .setThumbnail(member.user.displayAvatarURL())
            .addField('Server', member.guild.name)
            .addField('Member', `${member}\n**Tag**: ${member.user.tag}\n**ID:** ${member.id}`)
            .addField('Violation', violation)
            .setFooter({ text: 'Discord Security' })
            .setTimestamp(Date.now());

        logChannel.send({ embeds: [embed] });
    } catch (error) {
        const embed = new MessageEmbed()
            .setAuthor({ name: 'Error', iconURL: client.user.displayAvatarURL() })
            .setColor(0xff4040)
            .addField('Error', 'Failed to auto ban.')
            .addField('Server', member.guild.name)
            .addField('Member', `${member}\n${member.user.tag}\n${member.id}`)
            .setFooter({ text: 'Discord Security' })
            .setTimestamp(Date.now());

        logChannel.send({ embeds: [embed] });
    }
}

export default ban;
