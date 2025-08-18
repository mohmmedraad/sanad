import type { NarratorsTable } from "@/client-db/schema";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { grades } from "@/constants";
import { changeNodes, getCustomNarrator } from "@/features/trees/lib/utils";
import { cn } from "@/lib/utils";
import {
    useTreeEditorStore,
    useTreeInteractionStore,
} from "@/store/tree-editor-store";
import { type NodeProps, Position } from "@xyflow/react";
import { memo, useCallback } from "react";
import type {
    NarratorType,
    NarratorNode as NodeType,
} from "../../../types/tree-editor";
import NarratorSelect from "../narrator-select";
import { Node, NodeHandle } from "../node";
import NodeLayoutController from "../node-layout-controller";

function NarratorNode({
    data,
    selected,
    className,
    ...props
}: React.ComponentProps<"div"> & NodeProps<NodeType>) {
    const setActiveNode = useTreeInteractionStore(
        (state) => state.setActiveNode,
    );
    const activeNode = useTreeInteractionStore((state) => state.activeNode);
    const narrator = data.narrator;

    return (
        <Node
            className={cn(
                "react-flow__handle-top-narrator z-auto!",
                "relative z-[10] flex size-full min-h-[50px] min-w-[190px] items-center justify-center rounded-full border-2 border-current bg-background text-[var(--narrator-current-bg)] transition-[color,box-shadow] duration-200 data-[selected=true]:ring-[3px] data-[selected=true]:ring-current/50",
            )}
            onClick={() => setActiveNode(props.id)}
            data-selected={activeNode === props.id}
            onDragCapture={() => {
                setActiveNode(null);
            }}
            style={{
                // @ts-ignore
                "--narrator-current-color": narrator.grade.color,
                "--narrator-current-bg": narrator.grade.backgroundColor,
            }}
        >
            <NarratorNodeHandles />
            <NarratorNodeGrade>{narrator?.grade.text}</NarratorNodeGrade>
            <div className="m-[1px] w-full px-4 text-card-foreground">
                {narrator.name}
            </div>
        </Node>
    );
}

function NarratorNodeGrade({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            className={cn(
                "-translate-x-1/2 -translate-y-[calc(100%+2px)] after:-left-1 before:-right-1 absolute top-0 left-1/2 z-[-2] h-[22px] w-[95px] rounded-t-full text-sm text-white before:absolute before:top-5 before:size-4 before:rounded-full before:bg-[var(--current)] after:absolute after:top-5 after:size-4 after:rounded-full after:bg-[var(--current)]",
                "bg-[var(--narrator-current-bg)] text-[var(--narrator-current-color)] [--current:var(--narrator-current-bg)]",
                className,
            )}
            {...props}
        />
    );
}

function NarratorNodeHandles() {
    return (
        <>
            <NodeHandle id="1" position={Position.Right} />
            <NodeHandle id="2" position={Position.Left} />
            <NodeHandle
                id="3"
                position={Position.Top}
                className="translate-x-[-10%] translate-y-[-27px]! md:translate-y-[-23px]!"
            />
            <NodeHandle id="4" position={Position.Bottom} />
        </>
    );
}

// Main component
export const NarratorNodeDetails = memo(({ node }: { node: NodeType }) => {
    return (
        <Tabs defaultValue="details" className="mt-2 w-full">
            <TabsList className="w-full">
                <TabsTrigger value="details">المحتوى</TabsTrigger>
                <TabsTrigger value="properties">السمات</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
                <NarratorDetailsTab node={node} />
            </TabsContent>
            <TabsContent value="properties">
                <NodeLayoutController />
            </TabsContent>
        </Tabs>
    );
});

const NarratorDetailsTab = memo(({ node }: { node: NodeType }) => {
    const customNarrator = getCustomNarrator(node.data.narrator);

    return (
        <div className="mt-4 space-y-2">
            <NarratorSelector
                nodeId={node.id}
                narratorId={node.data.narrator.id?.toString()}
            />
            <CustomNarratorSection
                node={node}
                customNarrator={customNarrator}
            />
        </div>
    );
});

// Narrator selector component
const NarratorSelector = memo(
    ({ narratorId, nodeId }: { nodeId: string; narratorId?: string }) => {
        const setNodes = useTreeEditorStore((state) => state.setNodes);

        const handleNarratorChange = useCallback(
            (value: NarratorsTable) => {
                setNodes((nodes) =>
                    changeNodes(nodes, nodeId, (node) => {
                        const grade = grades[value.grade];
                        // @ts-ignore
                        node.data.narrator = {
                            id: value.id,
                            name: value.name,
                            grade: {
                                text: value.gradeAr,
                                color: grade.color,
                                backgroundColor: grade.backgroundColor,
                            },
                        };
                    }),
                );
            },
            [nodeId, setNodes],
        );

        return (
            <div>
                <Label className="mb-2" id="narrator-select">
                    الراوي
                </Label>
                <NarratorSelect
                    id="narrator-select"
                    narratorId={narratorId}
                    onChange={handleNarratorChange}
                />
            </div>
        );
    },
);

const CustomNarratorSection = memo(
    ({
        node,
        customNarrator,
    }: {
        node: NodeType;
        customNarrator: NarratorType | null;
    }) => {
        console.log({ customNarrator });
        return (
            <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue={customNarrator ? "custom-narrator" : ""}
            >
                <AccordionItem value="custom-narrator">
                    <AccordionTrigger>راوي مخصص</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4 pt-2">
                            <CustomNarratorName
                                nodeId={node.id}
                                value={customNarrator?.name ?? ""}
                            />
                            <CustomNarratorGrade
                                nodeId={node.id}
                                value={customNarrator?.grade.text ?? ""}
                            />
                            <CustomNarratorColors
                                node={node}
                                customNarrator={customNarrator}
                            />
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        );
    },
);

// Custom narrator name component
const CustomNarratorName = memo(
    ({
        value,
        nodeId,
    }: {
        value?: string;
        nodeId: string;
    }) => {
        const setNodes = useTreeEditorStore((state) => state.setNodes);

        const handleNameChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                setNodes((nodes) =>
                    changeNodes<NodeType>(
                        nodes as NodeType[],
                        nodeId,
                        (node) => {
                            node.data.narrator.id = undefined;
                            node.data.narrator.name = e.target.value;
                        },
                    ),
                );
            },
            [nodeId, setNodes],
        );

        console.log("re-render");

        return (
            <div>
                <Label htmlFor="custom-narrator-name" className="mb-2">
                    اسم الراوي
                </Label>
                <Input
                    id="custom-narrator-name"
                    placeholder="أدخل اسم الراوي"
                    value={value}
                    onChange={handleNameChange}
                />
            </div>
        );
    },
);

// Custom narrator grade component
const CustomNarratorGrade = memo(
    ({
        value,
        nodeId,
    }: {
        value?: string;
        nodeId: string;
    }) => {
        const setNodes = useTreeEditorStore((state) => state.setNodes);

        const handleGradeChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                setNodes((nodes) =>
                    changeNodes<NodeType>(
                        nodes as NodeType[],
                        nodeId,
                        (node) => {
                            node.data.narrator.id = undefined;
                            node.data.narrator.grade.text = e.target.value;
                        },
                    ),
                );
            },
            [nodeId, setNodes],
        );

        return (
            <div>
                <Label htmlFor="custom-narrator-grade" className="mb-2">
                    الدرجة
                </Label>
                <Input
                    id="custom-narrator-grade"
                    placeholder="ادخل درجة الراوي"
                    value={value}
                    onChange={handleGradeChange}
                />
            </div>
        );
    },
);

// Custom narrator colors component
const CustomNarratorColors = memo(
    ({
        node,
        customNarrator,
    }: {
        node: NodeType;
        customNarrator: NarratorType | null;
    }) => {
        const setNodes = useTreeEditorStore((state) => state.setNodes);

        const handleBackgroundColorChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                setNodes((nodes) =>
                    changeNodes<NodeType>(
                        nodes as NodeType[],
                        node.id,
                        (node) => {
                            node.data.narrator.id = undefined;
                            node.data.narrator.grade.backgroundColor =
                                e.target.value;
                        },
                    ),
                );
            },
            [node.id, setNodes],
        );

        const handleTextColorChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                setNodes((nodes) =>
                    changeNodes<NodeType>(
                        nodes as NodeType[],
                        node.id,
                        (node) => {
                            node.data.narrator.id = undefined;
                            node.data.narrator.grade.color = e.target.value;
                        },
                    ),
                );
            },
            [node.id, setNodes],
        );

        return (
            <div className="flex gap-4">
                <div>
                    <Label htmlFor="background-color" className="mb-2">
                        اللون
                    </Label>
                    <Input
                        id="background-color"
                        type="color"
                        value={customNarrator?.grade.backgroundColor ?? ""}
                        onChange={handleBackgroundColorChange}
                        className="h-9 w-12 cursor-pointer p-0"
                    />
                </div>
                <div>
                    <Label htmlFor="grade-color" className="mb-2">
                        لون الخط
                    </Label>
                    <Input
                        id="grade-color"
                        type="color"
                        value={customNarrator?.grade.color ?? ""}
                        onChange={handleTextColorChange}
                        className="h-9 w-12 cursor-pointer p-0"
                    />
                </div>
            </div>
        );
    },
);

export default memo(NarratorNode);
