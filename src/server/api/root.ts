import hadithRoute from "@/features/hadith/server/api/route";
import narratorsRoute from "@/features/narrators/server/api/route";
import treesRoute from "@/features/trees/server/api/route";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    trees: treesRoute,
    hadith: hadithRoute,
    narrators: narratorsRoute,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
