import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NumberInput from "@/components/ui/number-input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { changeNodes } from "@/features/trees/lib/utils";
import {
    useTreeEditorStore,
    useTreeInteractionStore,
} from "@/store/tree-editor-store";
import { type NodeProps, Position } from "@xyflow/react";
import { memo, useCallback } from "react";
import type { SpeakerNode as NodeType } from "../../../types/tree-editor";
import { Node, NodeHandle } from "../node";
import { NodeBackgroundControl } from "../node-background-control";
import { NodeBorderControl } from "../node-border-control";
import NodeLayoutController from "../node-layout-controller";

function SpeakerNode({
    data,
    selected,
    className,
    ...props
}: React.ComponentProps<"div"> & NodeProps<NodeType>) {
    const setActiveNode = useTreeInteractionStore(
        (state) => state.setActiveNode,
    );

    return (
        <Node
            style={{
                color: data.border?.color,
                border: `${data.border?.width}px ${data.border?.style} ${data.border?.color}`,
                borderRadius: `${data.border?.rounded}px`,
                backgroundColor: data.background,
            }}
            className="flex items-center justify-center"
            onClick={() => setActiveNode(props.id)}
        >
            <SpeakerNodeHandles />
            <div
                style={{
                    fontSize: data.fontSize,
                    color: data.color,
                }}
                className="w-full"
            >
                {data.label}
            </div>
        </Node>
    );
}

function SpeakerNodeHandles() {
    return (
        <>
            <NodeHandle id="1" position={Position.Right} />
            <NodeHandle id="2" position={Position.Left} />
            <NodeHandle
                id="3"
                position={Position.Top}
                style={{
                    translate: "-10% 0",
                }}
            />
            <NodeHandle id="4" position={Position.Bottom} />
        </>
    );
}

export const SpeakerNodeDetails = memo(({ node }: { node: NodeType }) => {
    const setNodes = useTreeEditorStore((state) => state.setNodes);

    const handleBorderChange = useCallback(
        (border: {
            width?: number;
            style?: string;
            color?: string;
        }) => {
            setNodes((nodes) =>
                changeNodes(nodes, node.id, (node) => {
                    // @ts-ignore
                    node.data.border.width =
                        // @ts-ignore
                        border.width ?? node.data.border.width;
                    // @ts-ignore
                    node.data.border.style =
                        // @ts-ignore
                        border.style ?? node.data.border.style;
                    // @ts-ignore
                    node.data.border.color =
                        // @ts-ignore
                        border.color ?? node.data.border.color;
                }),
            );
        },
        [node, setNodes],
    );

    return (
        <Tabs defaultValue="details" className="mt-2 w-full">
            <TabsList className="w-full">
                <TabsTrigger value="details">المحتوى</TabsTrigger>
                <TabsTrigger value="properties">السمات</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
                <div className="mt-4">
                    <div>
                        <Label className="mb-2">العنوان</Label>
                        <Input
                            defaultValue={node.data.label}
                            onChange={(e) =>
                                setNodes((nodes) =>
                                    changeNodes(nodes, node.id, (node) => {
                                        node.data.label = e.target.value;
                                    }),
                                )
                            }
                        />
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="properties">
                <NodeLayoutController />

                <Separator className="my-6" />

                <div className="flex gap-2">
                    <div>
                        <Label className="mb-2">الخط</Label>
                        <NumberInput
                            defaultValue={node.data.fontSize}
                            onChange={(e) =>
                                setNodes((nodes) =>
                                    changeNodes(nodes, node.id, (node) => {
                                        // @ts-ignore
                                        node.data.fontSize = e;
                                    }),
                                )
                            }
                            minValue={12}
                        />
                    </div>
                    <div>
                        <Label className="mb-2">لون الخط</Label>
                        <Input
                            id="border-color"
                            type="color"
                            defaultValue={node.data.color}
                            onChange={(e) =>
                                setNodes((nodes) =>
                                    changeNodes(nodes, node.id, (node) => {
                                        // @ts-ignore
                                        node.data.color = e.target.value;
                                    }),
                                )
                            }
                            className="h-9 w-full cursor-pointer p-0"
                        />
                    </div>
                </div>

                <Separator className="my-6" />

                <Label className="mb-2">الاطار</Label>
                <NodeBorderControl
                    border={node.data.border}
                    onWidthChange={(width) => handleBorderChange({ width })}
                    onStyleChange={(style) => handleBorderChange({ style })}
                    onColorChange={(color) => handleBorderChange({ color })}
                />

                <Separator className="my-6" />

                <NodeBackgroundControl
                    background={node.data.background}
                    onBackgroundChange={(background) =>
                        setNodes((nodes) =>
                            changeNodes(nodes, node.id, (node) => {
                                // @ts-ignore
                                node.data.background = background;
                            }),
                        )
                    }
                />
            </TabsContent>
        </Tabs>
    );
});

export default memo(SpeakerNode);
