import type { SlateElementProps } from "@udecode/plate";

import { ChevronRightIcon } from "@/components/icons";
import { SlateElement } from "@udecode/plate";

export function ToggleElementStatic(props: SlateElementProps) {
    return (
        <SlateElement {...props} className="ps-6">
            <div
                className="-start-0.5 absolute top-0 size-6 cursor-pointer select-none items-center justify-center rounded-md p-px text-muted-foreground transition-colors hover:bg-accent [&_svg]:size-4"
                contentEditable={false}
            >
                <ChevronRightIcon className="rotate-0 transition-transform duration-75" />
            </div>
            {props.children}
        </SlateElement>
    );
}
