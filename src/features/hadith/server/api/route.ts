import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { hadithSearchParamsSchema } from "../../schemas";
import { DorarHadithApi } from "../providers/dorar-hadith-api.provider";
import { HadithService } from "../service";

const hadithService = new HadithService(new DorarHadithApi());

const hadithRoute = createTRPCRouter({
    get: privateProcedure
        .input(hadithSearchParamsSchema)
        .query(async ({ input }) => {
            const hadith = await hadithService.getHadith(input);
            return { success: true, hadith: hadith.data };
        }),
});

export default hadithRoute;
