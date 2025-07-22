import { Trash2Icon, XIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
    useTreeEditorStore,
    useTreeInteractionStore,
} from "@/store/tree-editor-store";
import { Panel, useKeyPress } from "@xyflow/react";

import { NarratorNodeDetails } from "./nodes/narrator-node";
import { SpeakerNodeDetails } from "./nodes/speaker-node";

const NODES = {
    speaker: {
        detailsComponent: SpeakerNodeDetails,
    },
    narrator: {
        detailsComponent: NarratorNodeDetails,
    },
};

export default function NodeDetailsPanel() {
    const activeNode = useTreeInteractionStore((state) => state.activeNode);
    const setActiveNode = useTreeInteractionStore(
        (state) => state.setActiveNode,
    );
    const setNodes = useTreeEditorStore((state) => state.setNodes);
    const nodes = useTreeEditorStore((state) => state.nodes);
    const isEscape = useKeyPress("Escape");

    if (!activeNode) return null;

    const node = nodes.find((node) => node.id === activeNode);

    if (!node) return null;

    const NodeDetails = NODES[node.type].detailsComponent;

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
                                    (n) => n.id === node.id,
                                );
                                if (index !== -1) nodes.splice(index, 1);
                            });
                            setActiveNode(null);
                        }}
                    >
                        <Trash2Icon />
                    </Button>
                </div>
                {/* @ts-ignore */}
                <NodeDetails node={node} />
            </div>
        </Panel>
    );
}
