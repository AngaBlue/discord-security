import { client } from '..';
import setStatus from '../methods/setStatus';

client.on('ready', () => {
    console.log(`Started on ${client.user.tag}`);
    setStatus();
});

// Update Status Every 10 Minutes
setInterval(setStatus, 10 * 60 * 1000);
