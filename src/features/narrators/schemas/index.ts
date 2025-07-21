import { narratorGrades } from "@/constants";
import z from "zod";

export const narratorsSchema = z
    .array(
        z.object({
            rawi_index: z.string(),
            name: z.string(),
            grade: z.enum(narratorGrades),
            places: z.array(z.string()),
            birth: z.string(),
            death: z.string(),
            date_birth: z.string(),
            date_death: z.string(),
            full_name: z.string(),
            grade_ar: z.string(),
            grade_en: z.string(),
        }),
    )
    .transform((items) =>
        items.map((item) => ({
            id: Number(item.rawi_index),
            name: item.name,
            grade: item.grade,
            places: item.places,
            birth: item.birth,
            death: item.death,
            dateBirth: item.date_birth,
            dateDeath: item.date_death,
            fullName: item.full_name,
            gradeAr: item.grade_ar,
            gradeEn: item.grade_en,
        })),
    );
