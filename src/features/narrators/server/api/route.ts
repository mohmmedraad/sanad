import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import z from "zod";
import { NarratorsService } from "../service";

const narratorsService = new NarratorsService();

const narratorsRoute = createTRPCRouter({
    get: privateProcedure
        .input(z.object({ version: z.string() }))
        .query(async ({ input }) => {
            const narratorsVersion = narratorsService.getNarratorsVersion();
            const isSameVersion = narratorsVersion === input.version;

            if (isSameVersion) {
                return { data: undefined, version: narratorsVersion };
            }

            const narrators = narratorsService.getNarrators();
            return { data: narrators, version: narratorsVersion };
        }),
});

export default narratorsRoute;
