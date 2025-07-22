import NarratorNode from "@/features/trees/components/tree-editor/nodes/narrator-node";
import SpeakerNode from "@/features/trees/components/tree-editor/nodes/speaker-node";
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
