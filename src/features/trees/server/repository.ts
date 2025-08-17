import { tree } from "@/server/db/schema/tree";
import type { DB, Tree } from "@/types";
import { eq } from "drizzle-orm";
import { defaultTree } from "./constants";
import type { ITreeRepository, UpdateTreeSchema } from "./types";

export class TreeRepository implements ITreeRepository {
    constructor(private db: DB) {}

    async findMany(params: {
        search?: string;
        take: number;
        userId?: string;
        cursor?: Date;
    }): Promise<Tree[]> {
        return this.db.query.tree.findMany({
            where: (tree, { eq, and, lt, like }) =>
                and(
                    params.userId ? eq(tree.userId, params.userId) : undefined,
                    params.search
                        ? like(tree.title, `%${params.search}%`)
                        : undefined,
                    params.cursor
                        ? lt(tree.createdAt, params.cursor)
                        : undefined,
                ),
            limit: params.take,
            orderBy: (tree, { desc }) => [desc(tree.createdAt)],
        });
    }

    async findById(id: string): Promise<Tree | undefined> {
        return this.db.query.tree.findFirst({
            where: (tree, { eq }) => eq(tree.id, id),
        });
    }

    findUserTree(params: { id: string; userId: string }): Promise<
        Tree | undefined
    > {
        return this.db.query.tree.findFirst({
            where: (tree, { eq, and }) =>
                and(eq(tree.id, params.id), eq(tree.userId, params.userId)),
        });
    }

    async create(params: { title: string; userId: string }): Promise<Tree> {
        const createdTree = (
            await this.db
                .insert(tree)
                .values({
                    title: params.title,
                    nodes: defaultTree.nodes,
                    edges: defaultTree.edges,
                    userId: params.userId,
                    showMiniMap: true,
                    draft: [],
                })
                .returning({
                    id: tree.id,
                    title: tree.title,
                    nodes: tree.nodes,
                    edges: tree.edges,
                    userId: tree.userId,
                    showMiniMap: tree.showMiniMap,
                    draft: tree.draft,
                    createdAt: tree.createdAt,
                    updatedAt: tree.updatedAt,
                })
        ).at(0);

        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        return createdTree!;
    }

    async update(params: UpdateTreeSchema): Promise<void> {
        await this.db
            .update(tree)
            .set({
                title: params.title,
                nodes: params.nodes,
                edges: params.edges,
                showMiniMap: params.showMiniMap,
                draft: params.draft,
            })
            .where(eq(tree.id, params.id));
    }

    async delete(params: { id: string }): Promise<void> {
        await this.db.delete(tree).where(eq(tree.id, params.id));
    }
}
