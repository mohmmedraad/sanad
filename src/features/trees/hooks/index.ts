import { type ReactQueryOptions, type RouterInputs, api } from "@/trpc/react";

export const useTreesQuery = (
    input: RouterInputs["trees"]["list"],
    options?: ReactQueryOptions["trees"]["list"],
) => {
    return api.trees.list.useQuery(input, {
        refetchOnWindowFocus: false,
        ...options,
    });
};

export const useTreesInfiniteQuery = (
    input: RouterInputs["trees"]["list"],
    options?: ReactQueryOptions["trees"]["list"],
) => {
    // @ts-expect-error
    return api.trees.list.useInfiniteQuery(input, {
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage, pages) =>
            lastPage?.nextCursor ?? undefined,
        initialPageParam: 0,
        ...options,
        initialData: { pageParams: 0, pages: [options?.initialData] },
    });
};

export const useCreateTree = (
    options?: ReactQueryOptions["trees"]["create"],
) => {
    const { mutate: createTree, ...data } =
        api.trees.create.useMutation(options);
    return {
        createTree,
        ...data,
    };
};

export const useUpdateTrees = (
    options?: ReactQueryOptions["trees"]["update"],
) => {
    const { mutate: updateTree, ...data } =
        api.trees.update.useMutation(options);
    return {
        updateTree,
        ...data,
    };
};

export const useDeleteTree = (
    options?: ReactQueryOptions["trees"]["delete"],
) => {
    const { mutate: deleteTree, ...data } =
        api.trees.delete.useMutation(options);
    return {
        deleteTree,
        ...data,
    };
};
