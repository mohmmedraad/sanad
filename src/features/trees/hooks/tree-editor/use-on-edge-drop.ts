import { getRandomId } from "@/lib/utils";
import {
    useTreeEditorStore,
    useTreeInteractionStore,
} from "@/store/tree-editor-store";
import { type OnConnectEnd, useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { createNode } from "../../lib/utils";

export const useOnEdgeDrop = () => {
    const { screenToFlowPosition } = useReactFlow();
    const setNodes = useTreeEditorStore((state) => state.setNodes);
    const setEdges = useTreeEditorStore((state) => state.setEdges);
    const setActiveNode = useTreeInteractionStore(
        (state) => state.setActiveNode,
    );

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    const onConnectEnd: OnConnectEnd = useCallback(
        (event, connectionState) => {
            if (connectionState.isValid || !connectionState.fromNode) {
                return;
            }

            const sourceNode = connectionState.fromNode;

            const id = getRandomId();
            const { clientX, clientY } =
                // biome-ignore lint/style/noNonNullAssertion: <explanation>
                "changedTouches" in event ? event.changedTouches[0]! : event;

            const position = screenToFlowPosition({
                x: clientX,
                y: clientY,
            });

            const distencBetweenNodeAndEdge = {
                x: Math.abs(position.x - sourceNode.position.x),
                y: Math.abs(position.y - sourceNode.position.y),
            };

            if (
                distencBetweenNodeAndEdge.x < 50 &&
                distencBetweenNodeAndEdge.y < 50
            ) {
                return;
            }

            const newNode = createNode(
                {
                    title: "راوي",
                    type: "narrator",
                },
                position,
            );
            // @ts-ignore
            newNode.position.x = newNode.position.x - newNode.width / 2;

            setNodes((nodes) => {
                nodes.push(newNode);
            });
            setEdges((edges) => {
                edges.push({
                    id,
                    // @ts-ignore
                    source: connectionState.fromNode.id,
                    target: newNode.id,
                    targetHandle: "3",
                    sourceHandle: connectionState.fromHandle?.id,
                });
            });

            setActiveNode(newNode.id);
        },
        [screenToFlowPosition],
    );

    return { onConnectEnd };
};
