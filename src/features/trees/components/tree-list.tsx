"use client";

import ConfirmActionAlert from "@/components/confirm-action-alert";
import { EllipsisIcon, Trash2Icon, TreePineIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteTree, useTreesInfiniteQuery } from "@/features/trees/hooks";
import { type RouterOutputs, api } from "@/trpc/react";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import Link from "next/link";
import { useEffect } from "react";

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
        {},
        {
            initialData: initialTrees,
        },
    );

    const [ref, entry] = useIntersectionObserver({
        threshold: 0,
        root: null,
        rootMargin: "50px",
    });

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        if (entry?.isIntersecting) {
            fetchNextPage();
        }
    }, [entry?.isIntersecting]);

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

function TreeCard(tree: {
    id: string;
    title: string;
    ref?: React.Ref<HTMLDivElement>;
}) {
    const { deleteTree, isSuccess } = useDeleteTree();
    const utils = api.useUtils();

    const handleDelete = () => {
        deleteTree({ id: tree.id });
    };

    useEffect(() => {
        if (isSuccess) {
            utils.trees.list.invalidate();
        }
    }, [isSuccess, utils]);

    return (
        <Card
            className="gap-0 p-3 shadow-xs transition-shadow duration-200 hover:shadow-md"
            ref={tree.ref}
        >
            <div className="h-20 w-full rounded-md bg-gray-100 dark:bg-gray-800" />
            <div className="mt-2 flex items-center justify-between">
                <Link href={`/trees/${tree.id}/edit`} className="block">
                    <CardTitle className="line-clamp-1 flex items-center gap-2 text-sm">
                        <TreePineIcon className="size-4 shrink-0" />
                        <h3>{tree.title}</h3>
                    </CardTitle>
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            size="icon"
                            variant={"secondary"}
                            className="size-6 rounded-full"
                        >
                            <EllipsisIcon />
                            <span className="sr-only">خيارات</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <ConfirmActionAlert
                            title="هل أنت متأكد من حذفك الشحرة؟"
                            description="هذا العملية لا يمكن التراجع عنها."
                            onConfirm={handleDelete}
                        >
                            <DropdownMenuItem
                                variant="destructive"
                                onSelect={(e) => e.preventDefault()}
                            >
                                <Trash2Icon />
                                حذف الشجرة
                            </DropdownMenuItem>
                        </ConfirmActionAlert>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </Card>
    );
}

function TreeCardSkeleton() {
    return (
        <div className="rounded-xl border bg-card p-3 shadow-xs">
            <Skeleton className="h-20 w-full rounded-md" />
            <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Skeleton className="size-4 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="size-6 rounded-full" />
            </div>
        </div>
    );
}
