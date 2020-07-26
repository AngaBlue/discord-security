import { client } from "..";
import setStatus from "../methods/setStatus";

client.on("ready", () => {
    console.log(`Started on ${client.user.tag}`);
    setStatus();
});
