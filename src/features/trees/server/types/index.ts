import type { inferSchemaType } from "@/lib/utils";
import type { Tree } from "@/types";
import type {
    createTreeSchema,
    treesSearchParamsSchema,
    updateTreeSchema,
} from "../schema";

export type TreesSearchParams = inferSchemaType<typeof treesSearchParamsSchema>;
export type CreateTreeSchema = inferSchemaType<typeof createTreeSchema>;
export type UpdateTreeSchema = inferSchemaType<typeof updateTreeSchema>;

export interface ITreeRepository {
    findMany(params: {
        take: number;
        search: string;
        userId?: string;
        cursor?: Date;
    }): Promise<Omit<Tree, "draft" | "nodes" | "edges" | "showMiniMap">[]>;

    findById(id: string): Promise<Tree | undefined>;

    findUserTree(params: { id: string; userId: string }): Promise<
        Tree | undefined
    >;

    create(params: { title: string }): Promise<Tree>;

    update(params: UpdateTreeSchema): Promise<void>;

    delete(params: { id: string }): Promise<void>;
}
