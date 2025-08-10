import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { NarratorsService } from "../service";

const narratorsService = new NarratorsService();

const narratorsRoute = createTRPCRouter({
    get: privateProcedure.query(async () => {
        const narrators = narratorsService.getNarrators();
        return { data: narrators };
    }),
    version: privateProcedure.query(async (c) => {
        const version = narratorsService.getNarratorsVersion();
        return { data: version };
    }),
});

export default narratorsRoute;
