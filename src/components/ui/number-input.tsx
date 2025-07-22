"use client";

import { Button, Group, Input, NumberField } from "react-aria-components";
import { ChevronDownIcon, ChevronUpIcon } from "../icons";

export default function NumberInput(
    props: React.ComponentProps<typeof NumberField>,
) {
    return (
        <NumberField {...props}>
            <div className="*:not-first:mt-2">
                <Group className="doutline-none relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-md border border-input text-sm shadow-xs transition-[color,box-shadow] data-focus-within:border-ring data-disabled:opacity-50 data-focus-within:ring-[3px] data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:border-destructive data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40">
                    <Input className="w-[inherit] flex-1 bg-background px-3 py-2 text-foreground tabular-nums" />
                    <div className="flex h-[calc(100%+2px)] flex-col">
                        <Button
                            slot="increment"
                            className="-me-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-muted-foreground/80 text-sm transition-[color,box-shadow] hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <ChevronUpIcon
                                width={12}
                                height={12}
                                aria-hidden="true"
                            />
                        </Button>
                        <Button
                            slot="decrement"
                            className="-me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-muted-foreground/80 text-sm transition-[color,box-shadow] hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <ChevronDownIcon
                                width={12}
                                height={12}
                                aria-hidden="true"
                            />
                        </Button>
                    </div>
                </Group>
            </div>
        </NumberField>
    );
}
