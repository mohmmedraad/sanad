import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { narratorGradesTranslation } from "@/constants";
import { changeNodes, getCustomNarrator } from "@/features/trees/lib/utils";
import { useNarratorsLiveQuery } from "@/hooks/use-narrators";
import { cn } from "@/lib/utils";
import {
    useTreeEditorStore,
    useTreeInteractionStore,
} from "@/store/tree-editor-store";
import type { NarratorGrade } from "@/types";
import { type NodeProps, Position } from "@xyflow/react";
import { type VariantProps, cva } from "class-variance-authority";
import { memo, useMemo } from "react";
import type { NarratorNode as NodeType } from "../../../types/tree-editor";
import NarratorGradeSelect from "../narrator-grade-select";
import NarratorSelect from "../narrator-select";
import { Node, NodeHandle } from "../node";
import NodeLayoutController from "../node-layout-controller";

const narratorNodeVariants = cva(
    "relative z-[10] flex size-full min-h-[50px] min-w-[190px] items-center justify-center rounded-full border border-2 bg-background transition-[color,box-shadow] duration-200 data-[selected=true]:ring-[3px] data-[selected=true]:ring-current/50",
    {
        variants: {
            variant: {
                companion: "border-current text-narrator-companion",
                "thiqa-thiqa": "border-current text-narrator-thiqa-thiqa",
                thiqa: "border-current text-narrator-thiqa",
                saduq: "border-current text-narrator-saduq",
                "saduq-yahim": "border-current text-narrator-saduq-yahim",
                maqbool: "border-current text-narrator-maqbool",
                mastur: "border-current text-narrator-mastur",
                weak: "border-current text-narrator-weak",
                majhool: "border-current text-narrator-majhool",
                matruk: "border-current text-narrator-matruk",
                muttaham: "border-current text-narrator-muttaham",
                kadhdhaab: "border-current text-narrator-kadhdhaab",
            },
        },
        defaultVariants: {
            variant: "majhool",
        },
    },
);

function NarratorNode({
    data,
    selected,
    className,
    variant,
    ...props
}: React.ComponentProps<"div"> &
    VariantProps<typeof narratorNodeVariants> &
    NodeProps<NodeType>) {
    const setActiveNode = useTreeInteractionStore(
        (state) => state.setActiveNode,
    );
    const activeNode = useTreeInteractionStore((state) => state.activeNode);
    const narrators = useNarratorsLiveQuery();
    const customNarrator = getCustomNarrator(data.narrator);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    const narrator = useMemo(() => {
        if (customNarrator) {
            return;
        }

        // @ts-ignore
        return narrators?.find((n) => n.id === data.narrator.id);
        // @ts-ignore
    }, [data.narrator.id, narrators]);

    const grade = customNarrator
        ? (customNarrator?.grade ?? "companion")
        : narrator?.grade;
    const name = customNarrator?.name ?? narrator?.name;

    return (
        <Node
            className={cn(
                "react-flow__handle-top-narrator z-auto!",
                narratorNodeVariants({
                    variant: grade,
                    className,
                }),
            )}
            onClick={() => setActiveNode(props.id)}
            data-selected={activeNode === props.id}
            onDragCapture={() => {
                console.log("double clicked");
                setActiveNode(null);
            }}
        >
            <NarratorNodeHandles />
            <NarratorNodeGrade grade={grade}>
                {customNarrator
                    ? narratorGradesTranslation[grade as NarratorGrade]
                    : narrator?.gradeAr}
            </NarratorNodeGrade>
            <div className="m-[1px] w-full px-4 text-card-foreground">
                {name}
            </div>
        </Node>
    );
}

const narratorNodeGradeVariants = cva(
    "-translate-x-1/2 -translate-y-[calc(100%+2px)] after:-left-1 before:-right-1 absolute top-0 left-1/2 z-[-2] h-[22px] w-[95px] rounded-t-full text-sm text-white before:absolute before:top-5 before:size-4 before:rounded-full before:bg-[var(--current)] after:absolute after:top-5 after:size-4 after:rounded-full after:bg-[var(--current)]",
    {
        variants: {
            variant: {
                companion:
                    "bg-[var(--current)] text-narrator-companion-foreground [--current:var(--narrator-companion)]",
                "thiqa-thiqa":
                    "bg-narrator-thiqa-thiqa text-narrator-thiqa-thiqa-foreground [--current:var(--narrator-thiqa-thiqa)]",
                thiqa: "bg-narrator-thiqa text-narrator-thiqa-foreground [--current:var(--narrator-thiqa)]",
                saduq: "bg-narrator-saduq text-narrator-saduq-foreground [--current:var(--narrator-saduq)]",
                "saduq-yahim":
                    "bg-narrator-saduq-yahim text-narrator-saduq-yahim-foreground [--current:var(--narrator-saduq-yahim)]",
                maqbool:
                    "bg-narrator-maqbool text-narrator-maqbool-foreground [--current:var(--narrator-maqbool)]",
                mastur: "bg-narrator-mastur text-narrator-mastur-foreground [--current:var(--narrator-mastur)]",
                weak: "bg-narrator-weak text-narrator-weak-foreground [--current:var(--narrator-weak)]",
                majhool:
                    "bg-narrator-majhool text-narrator-majhool-foreground [--current:var(--narrator-majhool)]",
                matruk: "bg-narrator-matruk text-narrator-matruk-foreground [--current:var(--narrator-matruk)]",
                muttaham:
                    "bg-narrator-muttaham text-narrator-muttaham-foreground [--current:var(--narrator-muttaham)]",
                kadhdhaab:
                    "bg-narrator-kadhdhaab text-narrator-kadhdhaab-foreground [--current:var(--narrator-kadhdhaab)]",
            },
        },
        defaultVariants: {
            variant: "majhool",
        },
    },
);

function NarratorNodeGrade({
    grade,
    className,
    ...props
}: React.ComponentProps<"div"> &
    VariantProps<typeof narratorNodeGradeVariants> & {
        grade?: NarratorGrade;
    }) {
    return (
        <div
            className={cn(
                narratorNodeGradeVariants({
                    variant: grade,
                    className,
                }),
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

export const NarratorNodeDetails = memo(({ node }: { node: NodeType }) => {
    const setNodes = useTreeEditorStore((state) => state.setNodes);
    const customNarrator = getCustomNarrator(node.data.narrator);

    return (
        <Tabs defaultValue="details" className="mt-2 w-full">
            <TabsList className="w-full">
                <TabsTrigger value="details">المحتوى</TabsTrigger>
                <TabsTrigger value="properties">السمات</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
                <div className="mt-4 space-y-2">
                    <div>
                        <Label className="mb-2" id="narrator-select">
                            الراوي
                        </Label>
                        <NarratorSelect
                            id="narrator-select"
                            // @ts-ignore
                            narratorId={node.data.narrator.id?.toString()}
                            onChange={(value) => {
                                setNodes((nodes) =>
                                    changeNodes(nodes, node.id, (node) => {
                                        // @ts-ignore
                                        node.data.narrator = {
                                            id: value,
                                        };
                                    }),
                                );
                            }}
                        />
                    </div>

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
                                    <div>
                                        <Label
                                            htmlFor="custom-narrator-name"
                                            className="mb-2"
                                        >
                                            اسم الراوي
                                        </Label>
                                        <Input
                                            id="custom-narrator-name"
                                            placeholder="أدخل اسم الراوي"
                                            value={customNarrator?.name || ""}
                                            onChange={(e) => {
                                                setNodes((nodes) =>
                                                    changeNodes(
                                                        nodes,
                                                        node.id,
                                                        (node) => {
                                                            // @ts-ignore
                                                            node.data.narrator =
                                                                {
                                                                    name: e
                                                                        .target
                                                                        .value,
                                                                    grade:
                                                                        // @ts-ignore
                                                                        node
                                                                            .data
                                                                            .narrator
                                                                            .grade ||
                                                                        "companion",
                                                                };
                                                        },
                                                    ),
                                                );
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <Label
                                            htmlFor="custom-narrator-grade"
                                            className="mb-2"
                                        >
                                            الدرجة
                                        </Label>
                                        <NarratorGradeSelect
                                            className="w-full"
                                            value={customNarrator?.grade || ""}
                                            onValueChange={(value) => {
                                                setNodes((nodes) =>
                                                    changeNodes(
                                                        nodes,
                                                        node.id,
                                                        (node) => {
                                                            // @ts-ignore
                                                            node.data.narrator =
                                                                {
                                                                    name:
                                                                        node
                                                                            .data
                                                                            .narrator
                                                                            .name ||
                                                                        "راوي",
                                                                    grade: value,
                                                                };
                                                        },
                                                    ),
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </TabsContent>
            <TabsContent value="properties">
                <NodeLayoutController node={node} />
            </TabsContent>
        </Tabs>
    );
});

export default memo(NarratorNode);
