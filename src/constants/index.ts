import type { NarratorGrade } from "@/types";

export const narratorGrades = [
    "companion",
    "thiqa-thiqa",
    "thiqa",
    "saduq",
    "saduq-yahim",
    "maqbool",
    "mastur",
    "weak",
    "majhool",
    "matruk",
    "muttaham",
    "kadhdhaab",
] as const;

export const narratorGradesTranslation: Record<NarratorGrade, string> = {
    companion: "صحابي",
    "thiqa-thiqa": "ثقة ثقة",
    thiqa: "ثقة",
    saduq: "صدوق",
    "saduq-yahim": "لين",
    maqbool: "مقبول",
    mastur: "مستور",
    weak: "ضعيف",
    majhool: "مجهول",
    matruk: "متروك",
    muttaham: "متهم",
    kadhdhaab: "كذاب",
};
