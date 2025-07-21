import { useState } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LoaderCircleIcon, MicIcon, SearchIcon } from "./icons";

type SerachInputProps = React.ComponentProps<typeof Input> & {
    id: string;
    isLoading?: boolean;
};
export default function SearchInput({
    id,
    onChange,
    className,
    isLoading = false,
    ...props
}: SerachInputProps) {
    const [inputValue, setInputValue] = useState("");

    return (
        <div className="relative w-full">
            <Input
                id={id}
                dir="rtl"
                className={cn("peer px-9", className)}
                placeholder="أبحث..."
                type="search"
                value={inputValue}
                onChange={(e) => {
                    onChange?.(e);
                    setInputValue(e.target.value);
                }}
                {...props}
            />
            <button
                className="absolute inset-y-0 start-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Press to speak"
                type="submit"
            >
                <MicIcon className="size-4" aria-hidden="true" />
            </button>
            <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                {isLoading ? (
                    <LoaderCircleIcon
                        className="size-4 animate-spin"
                        role="status"
                        aria-label="جار التحميل..."
                    />
                ) : (
                    <SearchIcon className="size-4" aria-hidden="true" />
                )}
            </div>
        </div>
    );
}
