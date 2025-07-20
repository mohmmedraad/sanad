import { z } from "zod";

export const treesSearchParamsSchema = z.object({
    cursor: z.coerce.number().optional().default(0).catch(0),
    limit: z.coerce.number().optional().default(10).catch(10),
    search: z.string().optional().default(""),
});

export const getTreeSchema = z.object({
    id: z.string(),
});

export const createTreeSchema = z.object({
    title: z.string().min(2),
});

export const updateTreeSchema = z.object({
    id: z.string(),
    title: z.string().min(2).optional(),
    draft: z.array(z.any()).optional(),
    nodes: z.array(z.any()).optional(),
    edges: z.array(z.any()).optional(),
    showMiniMap: z.boolean().optional(),
});
