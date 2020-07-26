import { client } from "..";

export default async function () {
    const guilds = client.guilds.cache.size;
    client.user.setActivity(`${guilds} Server${guilds > 1 ? "s" : ""}`, {
        type: "WATCHING"
    });
}
