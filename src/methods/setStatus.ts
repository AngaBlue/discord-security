import { client } from "..";

export default function setStatus(): void  {
    const guilds = client.guilds.cache.size;
    client.user.setActivity(`${guilds} Server${guilds > 1 ? "s" : ""}`, {
        type: "WATCHING"
    });
}
