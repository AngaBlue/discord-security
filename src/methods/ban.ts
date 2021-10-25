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
        logChannel.send(
            new MessageEmbed()
                .setAuthor('Member Auto Banned', client.user.displayAvatarURL())
                .setColor(0xff4040)
                .setThumbnail(member.user.displayAvatarURL())
                .addField('Server', member.guild.name)
                .addField('Member', `${member}\n**Tag**: ${member.user.tag}\n**ID:** ${member.id}`)
                .addField('Violation', violation)
                .setFooter('Discord Security')
                .setTimestamp(Date.now())
        );
    } catch (error) {
        logChannel.send(
            new MessageEmbed()
                .setAuthor('Error', client.user.displayAvatarURL())
                .setColor(0xff4040)
                .addField('Error', 'Failed to auto ban.')
                .addField('Server', member.guild.name)
                .addField('Member', `${member}\n${member.user.tag}\n${member.id}`)
                .setFooter('Discord Security')
                .setTimestamp(Date.now())
        );
    }
}

export default ban;
