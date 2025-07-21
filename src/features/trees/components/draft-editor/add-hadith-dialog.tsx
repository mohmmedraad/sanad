import SearchInput from "@/components/search-input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { env } from "@/env";
import type { Hadith } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getEditorPlugin, useEditorRef } from "@udecode/plate/react";
import { useDebounce } from "@uidotdev/usehooks";
import { LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import { HADITH_KEY } from "./plugins/hadith-plugin";

type AddHadithDialogProps = { children: React.ReactNode };

export default function AddHadithDialog(props: AddHadithDialogProps) {
    const editor = useEditorRef();
    const { tf } = getEditorPlugin(editor, {
        key: HADITH_KEY,
    });
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 700);
    const { data, isError, isFetching } = useQuery({
        queryKey: ["hadith-search", debouncedSearch],
        queryFn: async () => getHadith(search),
        enabled: !!debouncedSearch,
    });
    const [open, setOpen] = useState(false);

    function onHadithChange(hadith: Hadith) {
        tf.insert.hadith({
            key: hadith.hadith,
            value: hadith,
        });

        editor.tf.focus();
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{props.children}</DialogTrigger>
            <DialogContent className="px-0" dir="rtl">
                <DialogHeader className="px-6">
                    <DialogTitle>أضافة حديث</DialogTitle>
                    <DialogDescription>
                        هذه الاحاديث من موقع الدرر السنية
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div dir="ltr" className="border-t">
                        <SearchInput
                            id="narrators-search"
                            className="w-full border-none shadow-none focus-visible:ring-[0px]"
                            onChange={(e) => setSearch(e.target.value)}
                            isLoading={isFetching}
                        />
                    </div>
                    <div className="max-h-80 overflow-y-auto overflow-x-hidden border-t">
                        {isFetching && (
                            <div className="mt-4 flex size-full items-center justify-center">
                                <LoaderCircleIcon
                                    className="animate-spin"
                                    size={16}
                                    role="status"
                                    aria-label="جار التحميل..."
                                />
                            </div>
                        )}

                        {isError && (
                            <div className="mt-4 flex size-full items-center justify-center text-center">
                                حدث خطأ حاول مجددا
                            </div>
                        )}
                        <ul className="divide-y divide-border">
                            {!isFetching &&
                                !isError &&
                                data?.map((hadith) => (
                                    <li key={hadith?.hadith}>
                                        <button
                                            type="button"
                                            className="relative w-full cursor-default select-none px-2 py-1.5 text-start text-sm outline-hidden hover:bg-gray-50 data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 dark:hover:bg-gray-950 [&_svg]:pointer-events-none [&_svg]:shrink-0"
                                            onClick={() =>
                                                onHadithChange(hadith)
                                            }
                                        >
                                            <div className="line-clamp-4">
                                                {hadith?.hadith}
                                            </div>
                                            <div className="mt-3 inline-flex flex-wrap gap-2">
                                                <div className="inline-flex shrink-0 gap-0.5 text-muted-foreground/70">
                                                    الراوي:
                                                    <div className="text-muted-foreground">
                                                        {hadith.rawi}
                                                    </div>
                                                </div>

                                                <div className="inline-flex shrink-0 gap-0.5 text-muted-foreground/70">
                                                    المحدث:
                                                    <div className="text-muted-foreground">
                                                        {hadith.mohdith}
                                                    </div>
                                                </div>

                                                <div className="inline-flex shrink-0 gap-0.5 text-muted-foreground/70">
                                                    المصدر:
                                                    <div className="text-muted-foreground">
                                                        {hadith.book}
                                                    </div>
                                                </div>

                                                <div className="inline-flex shrink-0 gap-0.5 text-muted-foreground/70">
                                                    الجزء أو الصفحة:
                                                    <div className="text-muted-foreground">
                                                        {hadith.numberOrPage}
                                                    </div>
                                                </div>

                                                <div className="inline-flex gap-0.5 text-muted-foreground/70">
                                                    <div className="shrink-0">
                                                        حكم المحدث:
                                                    </div>
                                                    <div className="text-muted-foreground">
                                                        {hadith.grade}
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

async function getHadith(search: string) {
    const url = `${env.NEXT_PUBLIC_WEBSITE_URL}/api/hadith?search=${search}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error?.status === "fail") {
            throw new Error("error");
        }

        return data.data as unknown as Hadith[];
    } catch (error) {
        console.log("error: ", error);
        throw error;
    }
}
