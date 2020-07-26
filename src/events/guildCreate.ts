import { client } from "..";
import setStatus from "../methods/setStatus";

client.on("guildCreate", (_guild) => setStatus());
