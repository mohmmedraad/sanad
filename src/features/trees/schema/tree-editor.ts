import z from "zod";
import type { MindMupNode } from "../types/tree-editor";

const nodePositionSchema = z.tuple([z.number(), z.number(), z.number()]);

const visualStyleSchema = z.object({
    color: z.string().optional(),
    lineStyle: z.enum(["solid", "dashed"]).catch("solid"),
    arrow: z.string().optional(),
});

const nodeAttributesSchema = z.object({
    position: nodePositionSchema,
});

const mindMapNodeSchema: z.ZodType<MindMupNode> = z.lazy(() =>
    z.object({
        id: z.number(),
        title: z.string(),
        ideas: z.record(mindMapNodeSchema).optional(),
        attr: nodeAttributesSchema.optional(),
    }),
);

const connectionSchema = z.object({
    ideaIdFrom: z.number(),
    ideaIdTo: z.number(),
    attr: z.object({
        style: visualStyleSchema,
    }),
});

export const mindMapFileSchema = z.object({
    formatVersion: z.number(),
    id: z.string(),
    title: z.string(),
    ideas: z.record(mindMapNodeSchema).optional(),
    links: z.array(connectionSchema).optional(),
});
