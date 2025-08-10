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
import { api } from "@/trpc/react";
import Link from "next/link";

export default function TreeCard(tree: {
    id: string;
    title: string;
    ref?: React.Ref<HTMLDivElement>;
}) {
    const { deleteTree, isSuccess } = useDeleteTree({
        onSuccess: () => {
            utils.trees.list.invalidate();
        },
    });
    const utils = api.useUtils();

    const handleDelete = () => {
        deleteTree({ id: tree.id });
    };

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
