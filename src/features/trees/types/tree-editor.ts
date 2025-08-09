import type { inferSchemaType } from "@/lib/utils";
import type { NarratorGrade } from "@/types";
import type {
    Edge as ReactFlowEdge,
    Node as ReactFlowNode,
} from "@xyflow/react";
import type { mindMapFileSchema } from "../schema/tree-editor";

export type NodeType = "narrator" | "speaker";

export type SpeakerNode = ReactFlowNode<{
    label: string;
    border?: {
        width: number;
        style: "solid" | "dotted" | "dashed";
        color: string;
        rounded: number;
    };
    background?: string;
    color?: string;
    fontSize?: number;
}> & {
    type: NodeType;
};
export type NarratorNode = ReactFlowNode<{
    label: string;
    narrator: NarratorType;
}> & {
    type: NodeType;
};
export type NarratorType = {
    id?: number;
    name: string;
    grade: NarratorGrade;
    gradeAr: string;
    gradeEn: string;
};

export type Node = SpeakerNode | NarratorNode;

export type Edge = ReactFlowEdge & {
    id: string;
    source: string;
    target: string;
};

export type CurrentDragedNode = {
    type: NodeType;
    title: string;
};

export interface MindMupStyle {
    background?: string;
    color?: string;
    fontSize?: number;
    fontWeight?: string;
}

export interface MindMupAttributes {
    style?: MindMupStyle;
    position?: [number, number, number];
    collapsed?: boolean;
    note?: string;
}

export interface MindMupNode {
    id: number;
    title?: string;
    text?: string;
    attr?: MindMupAttributes;
    ideas?: Record<string, MindMupNode>;
}

export type MindMupData = inferSchemaType<typeof mindMapFileSchema>;

export interface ConversionResult {
    nodes: NarratorNode[];
    edges: Edge[];
}

export interface LayoutOptions {
    horizontalSpacing?: number;
    verticalSpacing?: number;
    rootX?: number;
    rootY?: number;
}

export interface ConversionOptions {
    layout?: LayoutOptions;
}

export type MobileDropEvent = CustomEvent<{
    title: string;
    type: NodeType;
    clientX: number;
    clientY: number;
}>;
