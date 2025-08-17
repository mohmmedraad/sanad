"use client";
import { TreePineIcon } from "@/components/icons";
import { useTreesInfiniteQuery } from "@/features/trees/hooks";
import { useInfiniteScroll } from "@/hooks/use-infinite-scrolling";
import type { RouterOutputs } from "@/trpc/react";
import TreeCard, { TreeCardSkeleton } from "./tree-card";

type TreeListProps = React.ComponentProps<"div"> & {
    initialTrees?: RouterOutputs["trees"]["list"];
};

export default function TreeList({ initialTrees, ...props }: TreeListProps) {
    const {
        data,
        fetchNextPage,
        isFetchingNextPage,
        isFetching,
        isLoading,
        isRefetching,
    } = useTreesInfiniteQuery(
        {
            limit: 10,
        },
        {
            initialData: initialTrees,
        },
    );

    const { ref } = useInfiniteScroll({
        onIntersect: fetchNextPage,
    });

    const trees = data?.pages?.flatMap((page) => page.data);

    return (
        <div {...props}>
            {isFetching && !isFetchingNextPage && (
                <>
                    <TreeCardSkeleton />
                    <TreeCardSkeleton />
                    <TreeCardSkeleton />
                    <TreeCardSkeleton />
                </>
            )}
            {!isFetching && trees?.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center gap-4 py-12 text-center text-muted-foreground">
                    <TreePineIcon className="size-12" />
                    <p>لا يوجد أشجار</p>
                    <p className="text-sm">ابدأ بإنشاء شجرتك الأولى</p>
                </div>
            )}
            {!isLoading &&
                !isRefetching &&
                trees?.map((tree, index) => {
                    const isLast = index === trees.length - 1;
                    if (isLast) {
                        return <TreeCard key={tree.id} {...tree} ref={ref} />;
                    }
                    return <TreeCard key={tree.id} {...tree} />;
                })}

            {isFetchingNextPage && (
                <>
                    <TreeCardSkeleton />
                    <TreeCardSkeleton />
                    <TreeCardSkeleton />
                    <TreeCardSkeleton />
                </>
            )}
        </div>
    );
}
