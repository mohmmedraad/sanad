import { useTreeEditorStore } from "@/store/tree-editor-store";
import { useReactFlow } from "@xyflow/react";
import { useCallback, useEffect } from "react";
import { createNode } from "../../lib/utils";
import type { MobileDropEvent } from "../../types/tree-editor";

export const useNodeDrop = () => {
    const { setNodes, currentDragedNode, setActiveNode } = useTreeEditorStore(
        (state) => state,
    );

    const { screenToFlowPosition } = useReactFlow();

    const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();

            // check if the dropped element is valid
            if (!currentDragedNode) {
                return;
            }

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode = createNode(currentDragedNode, position);

            // @ts-ignore
            newNode.position.x = newNode.position.x - newNode.width / 2;

            setNodes((nodes) => {
                nodes.push(newNode);
            });
            setActiveNode(newNode.id);
        },
        [screenToFlowPosition, currentDragedNode, setNodes, setActiveNode],
    );

    const onDragStart = useCallback(
        (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
            event.dataTransfer.setData("application/reactflow", nodeType);
            event.dataTransfer.effectAllowed = "move";
        },
        [],
    );

    useEffect(() => {
        const handleMobileDrop = (event: MobileDropEvent) => {
            const { title, type, clientX, clientY } = event.detail;

            // synthetic drop event that matches the desktop drop event structure
            const syntheticEvent = {
                preventDefault: () => {},
                stopPropagation: () => {},
                clientX,
                clientY,
                dataTransfer: {
                    getData: () => JSON.stringify({ title, type }),
                },
            };

            // @ts-ignore
            onDrop(syntheticEvent);
        };
        // @ts-ignore
        document.addEventListener("mobileDrop", handleMobileDrop);

        // Cleanup
        return () => {
            if (document) {
                // @ts-ignore
                document.removeEventListener("mobileDrop", handleMobileDrop);
            }
        };
    }, [onDrop]);

    return { onDrop, onDragOver, onDragStart };
};
