import { client } from "..";

client.on("ready", () => {
    console.log(`Started on ${client.user.tag}`);
    client.user.setActivity(`bad boi banner who bans bad bois`, {
        type: "PLAYING"
    });
});
