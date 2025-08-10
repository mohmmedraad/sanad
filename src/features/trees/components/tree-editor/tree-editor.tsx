import {
    useTreeEditorStore,
    useTreeInteractionStore,
} from "@/store/tree-editor-store";
import {
    Background,
    ConnectionMode,
    MiniMap,
    ReactFlow,
    SelectionMode,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import "tailwindcss";

import {
    TREE_EDITOR_BACKGROUND_CONFIG,
    TREE_EDITOR_DEFAULT_EDGE_OPTIONS,
    edgeTypes,
    nodeTypes,
} from "@/features/trees/constants/tree-editor";
import { useClickAway } from "@uidotdev/usehooks";
import { useTheme } from "next-themes";
import { useCallback, useRef } from "react";
import { useCopyPasteNodes } from "../../hooks/tree-editor/use-copy-paste-nodes";
import { useNodeDrop } from "../../hooks/tree-editor/use-node-drop";
import { useOnEdgeDrop } from "../../hooks/tree-editor/use-on-edge-drop";
import ConnectionLine from "./connection-line";
import TreeOptionsPanel from "./editor-options-panel";
import EditorToolSidebar from "./editor-tool-sidebar";
import NodeDetailsPanel from "./node-details-panel";
import ZoomAndHistoryPanel from "./zoom-and-history-panel";

interface TreeEditorProps {
    children?: React.ReactNode;
}

export function TreeEditor({ children }: TreeEditorProps) {
    const { nodes, edges, miniMap, onNodesChange, onEdgesChange, onConnect } =
        useTreeEditorStore((state) => state);
    const setActiveNode = useTreeInteractionStore(
        (state) => state.setActiveNode,
    );
    const setIsEditorFocus = useTreeInteractionStore(
        (state) => state.setIsEditorFocus,
    );

    const { onDrop, onDragOver, onDragStart } = useNodeDrop();
    const { onConnectEnd } = useOnEdgeDrop();
    const reactFlowRef = useRef<HTMLDivElement>(null);
    useCopyPasteNodes();
    const editorContainerRef = useClickAway<HTMLDivElement>(() => {
        setIsEditorFocus(() => false);
    });

    const handlePaneClick = useCallback(() => {
        setActiveNode(null);
        setIsEditorFocus(() => true);
    }, [setActiveNode, setIsEditorFocus]);

    const handleSetFocus = useCallback(() => {
        setIsEditorFocus(() => true);
    }, [setIsEditorFocus]);

    const { theme } = useTheme();

    return (
        <div
            style={{
                width: "100%",
                height: "calc(100dvh - var(--header-hight))",
            }}
            ref={editorContainerRef}
        >
            <ReactFlow
                ref={reactFlowRef}
                id="tree-editor"
                style={{
                    background: "white",
                }}
                // @ts-ignore
                colorMode={theme}
                fitView
                nodes={nodes}
                edges={edges}
                onConnect={onConnect}
                defaultEdgeOptions={TREE_EDITOR_DEFAULT_EDGE_OPTIONS}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                connectionLineComponent={ConnectionLine}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                connectionMode={ConnectionMode.Loose}
                onDrop={onDrop}
                //@ts-expect-error error
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onPaneClick={handlePaneClick}
                onConnectEnd={onConnectEnd}
                selectionOnDrag
                selectionMode={SelectionMode.Partial}
                onEdgeClick={handleSetFocus}
                onNodeClick={handleSetFocus}
                onClick={handleSetFocus}
                onFocus={handleSetFocus}
            >
                <EditorToolSidebar />
                <NodeDetailsPanel />
                {children}
                <Background
                    className="bg-background"
                    {...TREE_EDITOR_BACKGROUND_CONFIG}
                />
                <TreeOptionsPanel />
                <ZoomAndHistoryPanel />

                {miniMap && (
                    <MiniMap
                        className="overflow-hidden rounded-xl"
                        style={{
                            marginBottom: 80,
                        }}
                    />
                )}
            </ReactFlow>
        </div>
    );
}
