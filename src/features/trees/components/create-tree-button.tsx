"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { inferSchemaType } from "@/lib/utils";
import { api } from "@/trpc/react";
import type { Tree } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateTree } from "../hooks";
import { addTreeSchema } from "../schema";

type CreateTreeButtonProps = React.ComponentProps<typeof DialogTrigger>;

export default function CreateTreeButton(props: CreateTreeButtonProps) {
    const form = useForm<inferSchemaType<typeof addTreeSchema>>({
        resolver: zodResolver(addTreeSchema),
        defaultValues: {
            title: "",
        },
    });
    const [open, setOpen] = useState(false);
    const utils = api.useUtils();
    const newTreeId = useId();

    const { createTree, isPending } = useCreateTree({
        onMutate: async (tree) => {
            await utils.trees.list.cancel();
            const queryKey = {
                limit: 10,
            };

            const previousData = utils.trees.list.getInfiniteData(queryKey);

            const newTree = {
                id: newTreeId,
                ...tree,
                isPending: true,
            } as unknown as Tree;
            utils.trees.list.setInfiniteData(queryKey, (oldData) => {
                if (!oldData) {
                    return {
                        pages: [
                            {
                                data: [newTree],
                                success: true,
                                nextCursor: null,
                            },
                        ],
                        pageParams: [null],
                    };
                }

                // biome-ignore lint/style/noNonNullAssertion: <explanation>
                const firstPage = oldData.pages[0]!;
                const updatedFirstPage = {
                    ...firstPage,
                    data: [newTree, ...firstPage.data],
                };

                return {
                    ...oldData,
                    pages: [updatedFirstPage, ...oldData.pages.slice(1)],
                };
            });

            setOpen(false);
            form.reset();

            return { previousData };
        },
        onSuccess: (createdPost) => {
            utils.trees.list.setInfiniteData({ limit: 10 }, (oldData) => {
                if (!oldData) return oldData;

                return {
                    ...oldData,
                    pages: oldData.pages.map((page, pageIndex) => {
                        if (pageIndex === 0) {
                            return {
                                ...page,
                                data: page.data.map((tree) =>
                                    tree.id === newTreeId
                                        ? createdPost.data
                                        : tree,
                                ),
                            };
                        }
                        return page;
                    }),
                };
            });
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

            toast.error("حدث خطأ اثناء اضافة الشجرة");
            setOpen(true);
            form.setValue("title", variables.title);
        },
    });

    async function onSubmit(values: inferSchemaType<typeof addTreeSchema>) {
        return createTree(values);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild {...props} />
            <DialogContent dir="rtl">
                <DialogHeader>
                    <DialogTitle>أضافة شجرة</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>العنوان</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="حديث الجارية"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="mt-4">
                            <DialogClose asChild>
                                <Button variant="outline" disabled={isPending}>
                                    الغاء
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={isPending}>
                                اضافة
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
