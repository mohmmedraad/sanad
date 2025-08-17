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
import { useDeleteTree } from "@/features/trees/hooks";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import Link from "next/link";
import { toast } from "sonner";

export default function TreeCard(tree: {
    id: string;
    title: string;
    isPending?: boolean;
    ref?: React.Ref<HTMLDivElement>;
}) {
    const utils = api.useUtils();

    const { deleteTree } = useDeleteTree({
        onMutate: async (treeToDelete) => {
            await utils.trees.list.cancel();
            const queryKey = {
                limit: 10,
            };

            const previousData = utils.trees.list.getInfiniteData(queryKey);

            utils.trees.list.setInfiniteData(queryKey, (oldData) => {
                if (!oldData) {
                    return oldData;
                }

                const newPages = oldData.pages.map((page) => ({
                    ...page,
                    data: page.data.filter(
                        (tree) => tree.id !== treeToDelete.id,
                    ),
                }));

                return {
                    ...oldData,
                    pages: newPages,
                };
            });

            return { previousData };
        },
        onError: (_, variables, context) => {
            // @ts-ignore
            if (context.previousData) {
                utils.trees.list.setInfiniteData(
                    {
                        limit: 10,
                    },
                    // @ts-ignore
                    context.previousData,
                );
            }

            toast.error("حدث خطأ اثناء حذف الشجرة");
        },
    });

    const handleDelete = () => {
        deleteTree({ id: tree.id });
    };

    return (
        <Link
            href={`/trees/${tree.id}/edit`}
            className={cn(tree.isPending && "pointer-events-none opacity-50")}
        >
            <Card
                className={
                    "gap-0 p-3 shadow-xs transition-shadow duration-200 hover:shadow-md"
                }
                ref={tree.ref}
            >
                <div className="h-20 w-full rounded-md bg-gray-100 dark:bg-gray-800" />
                <div className="mt-2 flex items-center justify-between">
                    <CardTitle className="line-clamp-1 flex items-center gap-2 text-sm">
                        <TreePineIcon className="size-4 shrink-0" />
                        <h3>{tree.title}</h3>
                    </CardTitle>
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
                                onCancel={(e) => e.stopPropagation()}
                                onConfirm={(e) => {
                                    e.stopPropagation();
                                    handleDelete();
                                }}
                            >
                                <DropdownMenuItem
                                    variant="destructive"
                                    onClick={(e) => e.stopPropagation()}
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
        </Link>
    );
}

export function TreeCardSkeleton() {
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
