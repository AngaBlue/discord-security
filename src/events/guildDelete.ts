import { client } from "..";
import setStatus from "../methods/setStatus";

client.on("guildDelete", (_guild) => setStatus());
