import * as envs from "@/config/plugins/envs.plugin";
import { Server } from "@/presentation/server";

main()

function main() {
    console.table(envs);

    Server.start();
}