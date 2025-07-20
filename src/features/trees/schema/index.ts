import { z } from "zod";

export const addTreeSchema = z.object({
    title: z.string().min(2, {
        message: "يجب ان لا يقل العنوان عن حرفين",
    }),
});
