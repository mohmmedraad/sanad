import { getRandomId } from "@/lib/utils";
import { useTreeEditorStore } from "@/store/tree-editor-store";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { useReactFlow } from "@xyflow/react";
import { useCallback, useEffect } from "react";
import type { Edge, Node } from "../../types/tree-editor";

type ClipboardData = {
    nodes: Node[];
    edges: Edge[];
};

export const useCopyPasteNodes = () => {
    const { getNodes, getEdges } = useReactFlow();
    const isEditorFocus = useTreeEditorStore((state) => state.isEditorFocus);
    const setNodes = useTreeEditorStore((state) => state.setNodes);
    const setEdges = useTreeEditorStore((state) => state.setEdges);
    const [_, copyToClipboard] = useCopyToClipboard();

    const handleCopyNodes = useCallback(async () => {
        try {
            if (!isEditorFocus) {
                return;
            }

            const nodes = getNodes();
            const edges = getEdges();

            if (!nodes || !edges) {
                console.warn("Failed to get nodes or edges");
                return;
            }

            const selectedNodes = nodes.filter((node) => node?.selected);

            if (selectedNodes.length === 0) {
                return;
            }

            // Only include edges where both source and target nodes are selected
            const selectedNodeIds = new Set(
                selectedNodes.map((node) => node.id),
            );
            const selectedEdges = edges.filter((edge) => {
                if (!edge?.selected || !edge?.source || !edge?.target) {
                    return false;
                }
                return (
                    selectedNodeIds.has(edge.source) &&
                    selectedNodeIds.has(edge.target)
                );
            });

            const clipboardData: ClipboardData = {
                // @ts-ignore
                nodes: selectedNodes,
                edges: selectedEdges,
            };

            console.log("copy");
            await copyToClipboard(JSON.stringify(clipboardData));
        } catch (error) {
            console.error("Error copying nodes:", error);
        }
    }, [isEditorFocus, getNodes, getEdges, copyToClipboard]);

    const handlePasteNodes = useCallback(async () => {
        try {
            if (!isEditorFocus) {
                return;
            }

            if (!navigator?.clipboard?.readText) {
                console.warn("Clipboard API not available");
                return;
            }

            const text = await navigator.clipboard.readText();

            if (!text?.trim()) {
                return;
            }

            let clipboardData: ClipboardData;

            try {
                clipboardData = JSON.parse(text);
            } catch (parseError) {
                console.warn("Invalid clipboard data format");
                return;
            }

            // Validate clipboard data structure
            if (
                !clipboardData ||
                !Array.isArray(clipboardData.nodes) ||
                !Array.isArray(clipboardData.edges)
            ) {
                console.warn("Invalid clipboard data structure");
                return;
            }

            const { nodes, edges } = clipboardData;

            if (nodes.length === 0) {
                return;
            }

            // Create mapping for old IDs to new IDs
            const nodeIdMapping: Record<string, string> = {};

            const newNodes = nodes
                .filter((node) => node?.id)
                .map((node) => {
                    const newId = getRandomId();
                    nodeIdMapping[node.id] = newId;

                    return {
                        ...node,
                        id: newId,
                        position: {
                            x: (node.position?.x ?? 0) + 20,
                            y: (node.position?.y ?? 0) + 20,
                        },
                    };
                });

            // Only create edges if both source and target nodes exist in the pasted nodes
            const newEdges = edges
                .filter((edge) => {
                    if (
                        edge?.source &&
                        edge?.target &&
                        nodeIdMapping[edge.source] &&
                        nodeIdMapping[edge.target]
                    ) {
                        return true;
                    }
                    return false;
                })
                .map((edge) => ({
                    ...edge,
                    id: getRandomId(),
                    source: nodeIdMapping[edge.source] as string,
                    target: nodeIdMapping[edge.target] as string,
                }));

            setNodes((prevNodes) => {
                // biome-ignore lint/complexity/noForEach: <explanation>
                prevNodes.forEach((node) => {
                    node.selected = false;
                });

                prevNodes.push(...newNodes);
            });

            setEdges((prevEdges) => {
                // biome-ignore lint/complexity/noForEach: <explanation>
                prevEdges.forEach((edge) => {
                    edge.selected = false;
                });
                prevEdges.push(...newEdges);
            });
        } catch (error) {
            console.error("Error pasting nodes:", error);
        }
    }, [isEditorFocus, setNodes, setEdges]);

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (!isEditorFocus) {
                return;
            }

            const isModifierKey = e.metaKey || e.ctrlKey;

            if (isModifierKey && e.key === "c" && !e.shiftKey && !e.altKey) {
                e.preventDefault();
                e.stopPropagation();
                handleCopyNodes();
            }

            if (isModifierKey && e.key === "v" && !e.shiftKey && !e.altKey) {
                e.preventDefault();
                e.stopPropagation();
                handlePasteNodes();
            }
        };

        document.addEventListener("keydown", handleKeydown);

        return () => {
            document.removeEventListener("keydown", handleKeydown);
        };
    }, [isEditorFocus, handleCopyNodes, handlePasteNodes]);
};
