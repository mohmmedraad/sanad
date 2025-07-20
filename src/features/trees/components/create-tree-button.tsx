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
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
    const { createTree, isPending, isSuccess } = useCreateTree();
    const utils = api.useUtils();

    async function onSubmit(values: inferSchemaType<typeof addTreeSchema>) {
        return createTree(values);
    }

    useEffect(() => {
        if (isSuccess) {
            setOpen(false);
            utils.trees.list.invalidate();
            form.reset();
        }
    }, [isSuccess, form, utils]);

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
