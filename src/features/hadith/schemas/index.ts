import { z } from "zod";

export const hadithSearchParamsSchema = z.object({
    search: z.string().optional().default(""),
    page: z.coerce.number().optional().default(1).catch(1),
});
