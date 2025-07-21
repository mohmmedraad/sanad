import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";
import {
    Handle,
    NodeResizeControl as ReactflowNodeResizeControl,
} from "@xyflow/react";
import { ArrowDownLeft, ArrowDownRight } from "lucide-react";

function Node({ className, ...porps }: React.ComponentProps<"div">) {
    return (
        <div
            {...porps}
            className={cn(
                "group size-full min-h-[50px] min-w-[100px] bg-card text-center",
                className,
            )}
        />
    );
}

const nodeHandleVariants = cva("border-current", {
    variants: {
        variant: {
            default:
                "visible size-3! hover:visible group-hover:visible md:invisible md:size-0!",
            invisible: "invisible",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

function NodeHandle({
    className,
    style,
    type = "source",
    variant,
    ...props
}: Omit<React.ComponentProps<typeof Handle>, "type"> &
    VariantProps<typeof nodeHandleVariants> & {
        type?: "source" | "target";
    }) {
    return (
        <Handle
            className={cn(nodeHandleVariants({ variant, className }))}
            style={{
                backgroundColor: "var(--background)", // inner fill color
                width: "0",
                height: "0",
                borderRadius: "50%",
                outline: "1px solid var(--background)", // visible inner border
                boxShadow: "0 0 0 3px currentColor", // outer ring
                zIndex: 999,
                ...style,
            }}
            type={type}
            {...props}
        />
    );
}

const nodeResizeControlVariants = cva(
    "size-3 translate-y-[-100%] text-foreground opacity-0 group-hover:opacity-100",
    {
        variants: {
            variant: {
                "bottom-left": "translate-x-[5px]",
                "bottom-right": "translate-x-[-14px]",
            },
        },
        defaultVariants: {
            variant: "bottom-left",
        },
    },
);

function NodeResizeControl({
    variant,
    className,
    ...props
}: React.ComponentProps<typeof ReactflowNodeResizeControl> &
    VariantProps<typeof nodeResizeControlVariants>) {
    return (
        <>
            <ReactflowNodeResizeControl
                style={{
                    background: "transparent",
                    border: "none",
                }}
                minWidth={100}
                minHeight={50}
                {...props}
            >
                {props.position === "bottom-left" && (
                    <ArrowDownLeft
                        className={cn(
                            nodeResizeControlVariants({
                                variant: props.position,
                                className,
                            }),
                        )}
                    />
                )}

                {props.position === "bottom-right" && (
                    <ArrowDownRight
                        className={cn(
                            nodeResizeControlVariants({
                                variant: props.position,
                                className,
                            }),
                        )}
                    />
                )}
            </ReactflowNodeResizeControl>
        </>
    );
}

export { Node, NodeHandle, NodeResizeControl };
