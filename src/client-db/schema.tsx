import type { NarratorGrade } from "@/types";
import type { EntityTable } from "dexie";

export type NarratorsTable = {
    id: string;
    name: string;
    grade: NarratorGrade;
    birth: string;
    death: string;
    places: string[];
    dateBirth: string;
    dateDeath: string;
    fullName: string;
    gradeAr: string;
    gradeEn: string;
};

export type NarratorsTableEntity = EntityTable<NarratorsTable, "id">;

export const narratorsTable = {
    columns:
        "++id, name, grade, birth, death, places, dateBirth, dateBeath, fullName, gradeAr, gradeEn",
};
