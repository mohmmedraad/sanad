import { Trash2Icon, XIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
    useTreeEditorStore,
    useTreeInteractionStore,
} from "@/store/tree-editor-store";
import { Panel, useKeyPress, useNodesData } from "@xyflow/react";
import { NarratorNodeDetails } from "./nodes/narrator-node";
import { SpeakerNodeDetails } from "./nodes/speaker-node";

export default function NodeDetailsPanel() {
    const activeNode = useTreeInteractionStore((state) => state.activeNode);
    const setActiveNode = useTreeInteractionStore(
        (state) => state.setActiveNode,
    );
    const setNodes = useTreeEditorStore((state) => state.setNodes);
    const node = useNodesData(activeNode ?? "");
    const isEscape = useKeyPress("Escape");

    if (!activeNode || !node) return null;

    if (isEscape) {
        setActiveNode(null);
    }

    return (
        <Panel position="top-right" className="z-[9999999]! mt-16!">
            <div
                dir="auto"
                className="h-[350px] w-[calc(100dvw-12px)] max-w-72 overflow-auto rounded-md border bg-background p-4 md:h-[400px] md:max-w-xs"
            >
                <div className="flex justify-between">
                    <Button
                        variant={"outline"}
                        size={"icon"}
                        onClick={() => setActiveNode(null)}
                    >
                        <XIcon />
                    </Button>
                    <Button
                        variant={"destructive"}
                        size={"icon"}
                        onClick={() => {
                            setNodes((nodes) => {
                                const index = nodes.findIndex(
                                    (n) => n.id === activeNode,
                                );
                                if (index !== -1) nodes.splice(index, 1);
                            });
                            setActiveNode(null);
                        }}
                    >
                        <Trash2Icon />
                    </Button>
                </div>
                {node.type === "narrator" && (
                    /* @ts-ignore */
                    <NarratorNodeDetails node={node} />
                )}

                {node.type === "speaker" && (
                    // @ts-ignore
                    <SpeakerNodeDetails node={node} />
                )}
            </div>
        </Panel>
    );
}
