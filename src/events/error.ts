import { client } from '..';

client.on('error', error => {
    console.error(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`);
});
