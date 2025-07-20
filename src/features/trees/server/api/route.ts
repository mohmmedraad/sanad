import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { TreeRepository } from "../repository";
import {
    createTreeSchema,
    getTreeSchema,
    treesSearchParamsSchema,
    updateTreeSchema,
} from "../schema";
import { TreesService } from "../service";

const treesService = new TreesService(new TreeRepository(db));

const treesRoute = createTRPCRouter({
    list: privateProcedure
        .input(treesSearchParamsSchema)
        .query(async ({ ctx, input }) => {
            const trees = await treesService.getUserTrees({
                ...input,
                userId: ctx.user.id,
            });

            return {
                data: trees,
                nextCursor: input.cursor + 1,
                success: true,
            };
        }),

    get: privateProcedure.input(getTreeSchema).query(async ({ ctx, input }) => {
        const tree = await treesService.getTree({
            id: input.id,
            userId: ctx.user.id,
        });

        return {
            data: tree,
            success: true,
        };
    }),

    create: privateProcedure
        .input(createTreeSchema)
        .mutation(async ({ ctx, input }) => {
            const tree = await treesService.createTree({
                ...input,
                userId: ctx.user.id,
            });

            return {
                data: tree,
                success: true,
            };
        }),

    update: privateProcedure
        .input(updateTreeSchema)
        .mutation(async ({ ctx, input }) => {
            await treesService.updateTree({
                ...input,
                userId: ctx.user.id,
            });

            return {
                success: true,
            };
        }),

    delete: privateProcedure
        .input(getTreeSchema)
        .mutation(async ({ ctx, input }) => {
            await treesService.deleteTree({
                id: input.id,
                userId: ctx.user.id,
            });

            return {
                success: true,
            };
        }),
});

export default treesRoute;
