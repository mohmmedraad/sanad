"use client";
import { useNarratorsLiveQuery } from "@/hooks/use-narrators";
import type { TMentionInputElement } from "@udecode/plate-mention";
import { getMentionOnSelectItem } from "@udecode/plate-mention";
import type { PlateElementProps } from "@udecode/plate/react";
import { PlateElement } from "@udecode/plate/react";
import Fuse from "fuse.js";
import { LoaderCircleIcon } from "lucide-react";
import * as React from "react";
import { MenuList } from "../tree-editor/menu-list";
import { NarratorBadge } from "../tree-editor/narrator-badge";
import {
    InlineCombobox,
    InlineComboboxContent,
    InlineComboboxEmpty,
    InlineComboboxInput,
    InlineComboboxItem,
} from "./inline-combobox";

const onSelectItem = getMentionOnSelectItem();

export function MentionInputElement(
    props: PlateElementProps<TMentionInputElement>,
) {
    const { editor, element } = props;
    const [search, setSearch] = React.useState("");
    const narrators = useNarratorsLiveQuery();

    const fuse = React.useMemo(
        () =>
            // @ts-ignore
            new Fuse(narrators, {
                keys: [
                    { name: "name", weight: 3 },
                    { name: "gradeAr", weight: 2 },
                ],
                threshold: 0.3,
                ignoreLocation: true,
                findAllMatches: true,
                isCaseSensitive: false,
            }),
        [narrators],
    );

    const results = React.useMemo(() => {
        if (!search) return narrators;
        return fuse.search(search).map((result) => result.item);
    }, [fuse, search, narrators]);

    return (
        <PlateElement {...props} as="span" data-slate-value={element.value}>
            <InlineCombobox
                value={search}
                element={element}
                setValue={setSearch}
                showTrigger={false}
                trigger="@"
                filter={false}
            >
                <span className="inline-block rounded-md bg-muted px-1.5 py-0.5 align-baseline text-sm ring-ring focus-within:ring-2">
                    <InlineComboboxInput dir="rtl" />
                </span>

                <InlineComboboxContent className="relative" dir="rtl">
                    <InlineComboboxEmpty className="hidden" />
                    {narrators === undefined && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <LoaderCircleIcon
                                className="animate-spin"
                                size={16}
                                role="status"
                                aria-label="جار التحميل..."
                            />
                        </div>
                    )}

                    {results?.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center text-center text-sm">
                            لا توجد نتائج
                        </div>
                    )}
                    <MenuList>
                        {results?.map((item) => (
                            <InlineComboboxItem
                                className="relative flex cursor-default select-none gap-3 rounded-md px-2 py-1.5 text-start text-sm outline-hidden data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0"
                                key={item.id.toString()}
                                value={item.name}
                                onClick={() =>
                                    onSelectItem(
                                        editor,
                                        {
                                            key: item.id.toString(),
                                            text: item.name,
                                        },
                                        search,
                                    )
                                }
                            >
                                {item.name}
                                <NarratorBadge
                                    variant={item.grade}
                                    className="h-max shrink-0"
                                >
                                    {item.gradeAr}
                                </NarratorBadge>
                            </InlineComboboxItem>
                        ))}
                    </MenuList>
                </InlineComboboxContent>
            </InlineCombobox>

            {props.children}
        </PlateElement>
    );
}
