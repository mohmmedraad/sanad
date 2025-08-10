import { clientDB } from "@/client-db";
import type { NarratorsTable } from "@/client-db/schema";
import { narratorGradesTranslation } from "@/constants";
import { getRandomId } from "@/lib/utils";
import dagre from "@dagrejs/dagre";
import type { XYPosition } from "@xyflow/react";
import Fuse from "fuse.js";
import { TREE_EDITOR_DEFAULT_EDGE_OPTIONS } from "../constants/tree-editor";
import type {
    ConversionOptions,
    CurrentDragedNode,
    Edge,
    LayoutOptions,
    MindMupData,
    MindMupNode,
    MobileDropEvent,
    NarratorNode,
    NarratorType,
    Node,
    NodeType,
} from "../types/tree-editor";

export function createNode(node: CurrentDragedNode, position: XYPosition) {
    let newNode: Node;

    if (node.type === "speaker") {
        newNode = {
            id: getRandomId(),
            type: "speaker",
            position,
            width: 250,
            height: 100,
            data: {
                label: node.title,
                background: "#fdf4ff",
                border: {
                    width: 3,
                    style: "solid",
                    color: "#e12afb",
                    rounded: 100,
                },
                color: "#4b004f",
                fontSize: 25,
            },
        };
    } else {
        newNode = createNarratorNode(
            {
                title: node.title,
                narrator: {
                    id: 4,
                    name: "آدم بن سليمان",
                    grade: "saduq",
                    gradeAr: "صدوق",
                    gradeEn: "saduq",
                },
            },
            position,
        );
    }

    return newNode;
}

export function createNarratorNode(
    node: {
        id?: string;
        title: string;
        narrator: NarratorType;
    },
    position: XYPosition,
) {
    return {
        id: node.id ?? getRandomId(),
        type: "narrator" as NodeType,
        position,
        width: 190,
        height: 50,
        data: {
            label: node.title,
            narrator: node.narrator,
        },
    };
}

export function changeNodes(
    nodes: Node[],
    nodeId: string,
    fn: (node: Node) => void,
) {
    const node = nodes.find((node) => node.id === nodeId);
    if (node) {
        fn(node);
    }
}

export function getCustomNarrator(narrator: NarratorType): NarratorType | null {
    if ("id" in narrator) {
        return null;
    }
    return narrator;
}

const getLayoutedTree = <T extends Node>({
    gap = 100,
    nodes,
    edges,
    direction = "TB",
    offsetX = 0,
    offsetY = 0,
}: {
    gap?: number;
    nodes: T[];
    edges: Edge[];
    direction?: "TB" | "LR";
    offsetX?: number;
    offsetY?: number;
}) => {
    const isHorizontal = direction === "LR";

    const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(
        () => ({}),
    );
    dagreGraph.setGraph({
        rankdir: direction,
        ranksep: gap,
    });

    // biome-ignore lint/complexity/noForEach: <explanation>
    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, {
            width: node.width,
            height: node.height,
        });
    });

    // biome-ignore lint/complexity/noForEach: <explanation>
    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const newNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);

        return {
            ...node,
            targetPosition: isHorizontal ? "left" : "top",
            sourcePosition: isHorizontal ? "right" : "bottom",
            position: {
                x: nodeWithPosition.x + offsetX,
                y: nodeWithPosition.y + offsetY,
            },
        };
    });

    return { nodes: newNodes, edges };
};

const calculatePosition = (
    level: number,
    index: number,
    totalSiblings: number,
    options: LayoutOptions = {},
): { x: number; y: number } => {
    const {
        horizontalSpacing = 300,
        verticalSpacing = 300,
        rootX = 0,
        rootY = 0,
    } = options;

    const x = rootX + level * horizontalSpacing;
    const y = rootY + (index - (totalSiblings - 1) / 2) * verticalSpacing;

    return { x, y };
};

const extractNodeTitle = (node: MindMupNode, fallbackId: string): string => {
    return node.title || node.text || `Node ${fallbackId}`;
};

const convertMindMupToReactFlow = async (
    mindmupData: MindMupData,
    options: ConversionOptions = {},
) => {
    const { layout = {} } = options;
    const nodes: Record<number, NarratorNode> = {};
    const edges: Edge[] = [];
    const narrators = await clientDB.narrators.toArray();
    const narratorSearch = getNarratorSearch(narrators);

    // Recursive node processing function
    const processNode = (
        node: MindMupNode,
        parentId: string | null = null,
        level = 0,
        siblingIndex = 0,
        totalSiblings = 1,
    ): string => {
        const currentNodeId = getRandomId();
        const title = extractNodeTitle(node, currentNodeId);

        const findedNarrator = narratorSearch.search(title).at(0)?.item;

        const narrator: NarratorType = findedNarrator
            ? {
                  id: findedNarrator.id,
                  name: findedNarrator.name,
                  grade: findedNarrator.grade,
                  gradeAr: findedNarrator.gradeAr,
                  gradeEn: findedNarrator.gradeEn,
              }
            : {
                  name: title,
                  grade: "majhool",
                  gradeAr: narratorGradesTranslation.majhool,
                  gradeEn: "majhool",
              };

        const reactFlowNode: NarratorNode = createNarratorNode(
            {
                id: currentNodeId,
                title,
                narrator,
            },
            {
                x: 0,
                y: 0,
            },
        );

        nodes[node.id] = reactFlowNode;

        // Create edge from parent if exists
        if (parentId) {
            const edge: Edge = {
                id: `edge-${parentId}-${currentNodeId}`,
                source: parentId,
                target: currentNodeId,
                sourceHandle: "4",
                targetHandle: "3",
                type: TREE_EDITOR_DEFAULT_EDGE_OPTIONS.type,
                markerEnd: TREE_EDITOR_DEFAULT_EDGE_OPTIONS.markerEnd,
            };
            edges.push(edge);
        }

        // Process children recursively
        if (node.ideas && typeof node.ideas === "object") {
            const childKeys = Object.keys(node.ideas);
            childKeys.forEach((key, index) => {
                // biome-ignore lint/style/noNonNullAssertion: <explanation>
                const childNode = node.ideas![key];
                if (childNode && typeof childNode === "object") {
                    processNode(
                        childNode,
                        currentNodeId,
                        level + 1,
                        index,
                        childKeys.length,
                    );
                }
            });
        }

        return currentNodeId;
    };

    // Validate input data
    if (!mindmupData || typeof mindmupData !== "object") {
        throw new Error("Invalid MindMup data: Expected object");
    }

    try {
        // Process root level nodes
        if (mindmupData.ideas && typeof mindmupData.ideas === "object") {
            // MindMup with root ideas
            const rootKeys = Object.keys(mindmupData.ideas);
            rootKeys.forEach((key, index) => {
                // biome-ignore lint/style/noNonNullAssertion: <explanation>
                const rootNode = mindmupData.ideas![key];
                if (rootNode && typeof rootNode === "object") {
                    processNode(rootNode, null, 0, index, rootKeys.length);
                }
            });
            // @ts-ignore
        } else if (mindmupData.title || mindmupData.text) {
            // @ts-ignore
            processNode(mindmupData);
        } else {
            throw new Error(
                "Invalid MindMup structure: No processable nodes found",
            );
        }

        if (mindmupData.links) {
            // biome-ignore lint/complexity/noForEach: <explanation>
            mindmupData.links.forEach((link) => {
                const parentId = nodes[link.ideaIdFrom]?.id;
                const currentNodeId = nodes[link.ideaIdTo]?.id;

                if (!parentId || !currentNodeId) {
                    return;
                }

                const edge = {
                    id: `edge-${parentId}-${currentNodeId}`,
                    source: parentId,
                    target: currentNodeId,
                    sourceHandle: "4",
                    targetHandle: "3",
                    type: TREE_EDITOR_DEFAULT_EDGE_OPTIONS.type,
                    markerEnd: TREE_EDITOR_DEFAULT_EDGE_OPTIONS.markerEnd,
                };

                edges.push(edge);
            });
        }
    } catch (error) {
        throw new Error(
            `Conversion failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
    }

    const { nodes: newNodes, edges: newEdges } = getLayoutedTree({
        nodes: Object.values(nodes),
        edges,
        offsetX: layout.rootX,
        offsetY: layout.rootY,
    });

    return { nodes: newNodes, edges: newEdges };
};

const getNarratorSearch = (narrators: NarratorsTable[]) => {
    return new Fuse(narrators, {
        keys: [
            { name: "name", weight: 3 },
            { name: "fullName", weight: 3 },
            { name: "gradeAr", weight: 2 },
        ],
        threshold: 0.3,
        ignoreLocation: true,
        findAllMatches: true,
        isCaseSensitive: false,
    });
};

export function findPositionNodes(nodes: Node[]) {
    if (nodes.length === 0) {
        return {
            minXNode: null,
            maxXNode: null,
            minYNode: null,
            maxYNode: null,
        };
    }

    let minXNode = nodes[0];
    let maxXNode = nodes[0];
    let minYNode = nodes[0];
    let maxYNode = nodes[0];

    for (const node of nodes) {
        const { x, y } = node.position;

        if (minXNode && x < minXNode.position.x) minXNode = node;
        if (maxXNode && x > maxXNode.position.x) maxXNode = node;
        if (minYNode && y < minYNode.position.y) minYNode = node;
        if (maxYNode && y > maxYNode.position.y) maxYNode = node;
    }

    return { minXNode, maxXNode, minYNode, maxYNode };
}

export { convertMindMupToReactFlow, calculatePosition, extractNodeTitle };

export function styleDragNodeElement(el: HTMLElement, x: number, y: number) {
    el.style.position = "fixed";
    el.style.top = `${y - 20}px`;
    el.style.left = `${x - 50}px`;
    el.style.opacity = "0.8";
    el.style.pointerEvents = "none";
    el.style.zIndex = "9999";
    el.style.transform = "rotate(5deg)";
    el.id = "mobile-drag-element";
}

export function positionDragNodeElement(el: HTMLElement, x: number, y: number) {
    el.style.left = `${x - 50}px`;
    el.style.top = `${y - 20}px`;
}

export function dispatchMobileDropNodeEvent(
    e: TouchEvent,
    node: { title: string; type: NodeType },
) {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const touch = e.changedTouches[0]!;
    const dropEvent = new CustomEvent("mobileDrop", {
        detail: { ...node, clientX: touch.clientX, clientY: touch.clientY },
    }) satisfies MobileDropEvent;
    document.dispatchEvent(dropEvent);
}
