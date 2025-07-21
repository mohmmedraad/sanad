import { useVirtualizer } from "@tanstack/react-virtual";
import { Children, type FC, type PropsWithChildren, useRef } from "react";

export const MenuList: FC<
    PropsWithChildren & {
        initialOffset?: number;
    }
> = (props) => {
    const { children, initialOffset = 0 } = props;
    const parentRef = useRef<HTMLDivElement | null>(null);
    const childrenArray = Children.toArray(children);
    const rowVirtualizer = useVirtualizer({
        count: childrenArray.length ?? childrenArray.length + 1,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 40,
        overscan: 5,
        initialOffset: 40 * initialOffset,
    });

    return (
        <div
            ref={parentRef}
            style={{
                height: "200px",
                width: "100%",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                overflow: "auto",
                zIndex: 99999,
            }}
            className="no-scrollbar"
            dir="rtl"
        >
            <div
                style={{
                    height: `${rowVirtualizer.getTotalSize() + 1}px`,
                }}
                className="relative w-full overflow-hidden p-2 text-foreground [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-xs"
            >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                    const value = childrenArray[virtualRow.index];
                    return (
                        <div
                            key={virtualRow.index}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: `${virtualRow.size}px`,
                                transform: `translateY(${virtualRow.start}px)`,
                            }}
                        >
                            {value}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
