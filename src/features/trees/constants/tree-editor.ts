import NarratorNode from "@/features/trees/components/tree-editor/nodes/narrator-node";
import SpeakerNode from "@/features/trees/components/tree-editor/nodes/speaker-node";
import type { NarratorGrade } from "@/types";
import {
    BackgroundVariant,
    type EdgeTypes,
    MarkerType,
    type NodeTypes,
} from "@xyflow/react";
import LabeledEdge from "../components/tree-editor/edges/labeled-edge";

export const nodeTypes = {
    narrator: NarratorNode,
    speaker: SpeakerNode,
} satisfies NodeTypes;

export const edgeTypes = {
    labeledEdge: LabeledEdge,
} satisfies EdgeTypes;

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

export const TREE_EDITOR_DEFAULT_EDGE_OPTIONS = {
    type: "labeledEdge" as const,
    markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
    },
};

export const TREE_EDITOR_BACKGROUND_CONFIG = {
    variant: BackgroundVariant.Dots,
    gap: 12,
    size: 1,
} as const;
