import { CheckIcon, ChevronDownIcon, CircleHelp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import NarratorTooltip from "@/components/narrator-tooltip";
import SearchInput from "@/components/search-input";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { TooltipProvider } from "@/components/ui/tooltip";
import { narratorGradesTranslation } from "@/constants";
import { useNarratorsLiveQuery } from "@/hooks/use-narrators";
import { cn } from "@/lib/utils";
import Fuse from "fuse.js";
import { MenuList } from "./menu-list";
import { NarratorBadge } from "./narrator-badge";

export default function NarratorSelect({
    id,
    narratorId = "1",
    onChange,
}: {
    id: string;
    narratorId?: string;
    onChange?: (narratorId: number) => void;
}) {
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>(narratorId);
    const [search, setSearch] = useState<string | null>(null);
    const narrators = useNarratorsLiveQuery();

    const fuse = useMemo(
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

    const results = useMemo(() => {
        if (!search) return narrators;
        return fuse.search(search).map((result) => result.item);
    }, [fuse, search, narrators]);

    useEffect(() => {
        setValue(narratorId);
    }, [narratorId]);

    const selectedNarrator = useMemo(
        () => narrators?.find((narrator) => narrator.id === +value),
        [value, narrators],
    );

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    const selectedNarratorIndex = useMemo(
        () =>
            results?.findIndex(
                (narrator) => narrator.id === selectedNarrator?.id,
            ),
        [selectedNarrator],
    );

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    variant="outline"
                    // biome-ignore lint/a11y/useSemanticElements: <explanation>
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between border-input bg-background px-3 font-normal outline-none outline-offset-0 hover:bg-background focus-visible:outline-[3px]"
                >
                    <span
                        className={cn(
                            "flex w-full gap-2 overflow-x-auto truncate",
                            !value && "text-muted-foreground",
                        )}
                    >
                        {selectedNarrator?.name ?? "اختر الرواي"}
                        {selectedNarrator && (
                            <>
                                <NarratorBadge variant={selectedNarrator.grade}>
                                    {
                                        narratorGradesTranslation[
                                            selectedNarrator.grade
                                        ]
                                    }
                                </NarratorBadge>
                                <NarratorTooltip
                                    narrator={selectedNarrator}
                                    className="mr-auto shrink-0"
                                >
                                    <CircleHelp className="size-4 shrink-0 text-muted-foreground/80" />
                                </NarratorTooltip>
                            </>
                        )}
                    </span>
                    <ChevronDownIcon
                        size={16}
                        className="shrink-0 text-muted-foreground/80"
                        aria-hidden="true"
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0"
                align="start"
                dir="rlt"
            >
                <div className="flex size-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground">
                    <SearchInput
                        id="narrators-search"
                        className="h-10 rounded-b-none border-input border-none shadow-none focus-visible:ring-[0px]"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="max-h-80 overflow-y-auto overflow-x-hidden border-t">
                        <TooltipProvider>
                            <MenuList initialOffset={selectedNarratorIndex}>
                                {results?.map((narrator) => (
                                    <button
                                        key={narrator.id}
                                        type="button"
                                        className="relative flex w-full cursor-default select-none items-center gap-3 rounded-md px-2 py-1.5 text-start text-sm outline-hidden data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0"
                                        onClick={() => {
                                            onChange?.(narrator.id);
                                            setValue(narrator.id.toString());
                                            setOpen(false);
                                        }}
                                    >
                                        {narrator.name}
                                        <NarratorBadge
                                            variant={narrator.grade}
                                            className="h-max shrink-0"
                                        >
                                            {narrator.gradeAr}
                                        </NarratorBadge>
                                        <NarratorTooltip
                                            narrator={narrator}
                                            className="mr-auto shrink-0"
                                        >
                                            <CircleHelp className="size-4 shrink-0 text-gray-500" />
                                        </NarratorTooltip>
                                        {+value === narrator.id && (
                                            <CheckIcon size={16} />
                                        )}
                                    </button>
                                ))}
                            </MenuList>
                        </TooltipProvider>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
