import { MessageEmbed, TextChannel } from 'discord.js';
import { client, config } from '..';
import setStatus from '../methods/setStatus';

client.on('guildCreate', async guild => {
    setStatus();
    const logChannel = (await client.channels.fetch(config.logChannel)) as TextChannel;
    logChannel.send(
        new MessageEmbed()
            .setAuthor('Joined Server', client.user.displayAvatarURL())
            .setColor(0x40ff40)
            .setThumbnail(guild.iconURL())
            .addField('Server', guild.name)
            .addField('Members', `${guild.memberCount} members`)
            .setFooter('Discord Security')
            .setTimestamp(Date.now())
    );
});
