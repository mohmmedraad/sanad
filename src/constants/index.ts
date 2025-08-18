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

export const grades = {
    companion: {
        text: "صحابي",
        color: "#ffffff",
        backgroundColor: "#5001f4",
    },
    "thiqa-thiqa": {
        text: "ثقة ثقة",
        color: "#ffffff",
        backgroundColor: "#021cf7",
    },
    thiqa: {
        text: "ثقة",
        color: "#000702",
        backgroundColor: "#009415",
    },
    saduq: {
        text: "صدوق",
        color: "#ffffff",
        backgroundColor: "#0061e7",
    },
    "saduq-yahim": {
        text: "لين",
        color: "#030700",
        backgroundColor: "#7fe615",
    },
    maqbool: {
        text: "مقبول",
        color: "#0e0400",
        backgroundColor: "#ffbd04",
    },
    mastur: {
        text: "مستور",
        color: "#000102",
        backgroundColor: "#475b7c",
    },
    weak: {
        text: "ضعيف",
        color: "#0f0200",
        backgroundColor: "#ff4000",
    },
    majhool: {
        text: "مجهول",
        color: "#000102",
        backgroundColor: "#475b7c",
    },
    matruk: {
        text: "متروك",
        color: "#100101",
        backgroundColor: "#ff2023",
    },
    muttaham: {
        text: "متهم",
        color: "#100101",
        backgroundColor: "#f5060a",
    },
    kadhdhaab: {
        text: "كذاب",
        color: "#ffffff",
        backgroundColor: "#000000",
    },
} as const;
