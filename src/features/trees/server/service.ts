import { APIException } from "@/lib/api-exception";
import type { TreeRepository } from "./repository";
import type {
    CreateTreeSchema,
    TreesSearchParams,
    UpdateTreeSchema,
} from "./types";

export class TreesService {
    constructor(private treeRepository: TreeRepository) {}

    async getUserTrees({
        cursor,
        limit,
        search,
        userId,
    }: TreesSearchParams & {
        userId: string;
    }) {
        const trees = await this.treeRepository.findMany({
            take: limit,
            cursor,
            search,
            userId,
        });

        return trees;
    }

    async getTree({
        id,
        userId,
    }: {
        id: string;
        userId: string;
    }) {
        const tree = await this.treeRepository.findUserTree({
            id,
            userId,
        });

        if (!tree) {
            throw new APIException("NOT_FOUND", {
                message: `Tree with the id: ${id} not found`,
            });
        }

        return tree;
    }

    async createTree(
        params: CreateTreeSchema & {
            userId: string;
        },
    ) {
        return this.treeRepository.create(params);
    }

    async updateTree({
        userId,
        ...params
    }: UpdateTreeSchema & {
        userId: string;
    }) {
        const tree = await this.treeRepository.findUserTree({
            id: params.id,
            userId,
        });

        if (!tree) {
            throw new APIException("NOT_FOUND", {
                message: "tree not found",
            });
        }

        await this.treeRepository.update(params);
    }

    async deleteTree({
        id,
        userId,
    }: {
        id: string;
        userId: string;
    }) {
        const tree = await this.treeRepository.findUserTree({
            id,
            userId,
        });

        if (!tree) {
            throw new APIException("NOT_FOUND", {
                message: "tree not found",
            });
        }

        await this.treeRepository.delete({ id });
    }
}
