import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const narratorBadgeVariants = cva(
    "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-xl border px-2 py-0.5 font-medium text-xs transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3",
    {
        variants: {
            variant: {
                companion:
                    "border-narrator-companion bg-narrator-companion text-narrator-companion-foreground",
                "thiqa-thiqa":
                    "border-narrator-thiqa-thiqa bg-narrator-thiqa-thiqa text-narrator-thiqa-thiqa-foreground",
                thiqa: "border-narrator-thiqa bg-narrator-thiqa text-narrator-thiqa-foreground",
                saduq: "border-narrator-saduq bg-narrator-saduq text-narrator-saduq-foreground",
                "saduq-yahim":
                    "border-narrator-saduq-yahim bg-narrator-saduq-yahim text-narrator-saduq-yahim-foreground",
                maqbool:
                    "border-narrator-maqbool bg-narrator-maqbool text-narrator-maqbool-foreground",
                mastur: "border-narrator-mastur bg-narrator-mastur text-narrator-mastur-foreground",
                weak: "border-narrator-weak bg-narrator-weak text-narrator-weak-foreground",
                majhool:
                    "border-narrator-majhool bg-narrator-majhool text-narrator-majhool-foreground",
                matruk: "border-narrator-matruk bg-narrator-matruk text-narrator-matruk-foreground",
                muttaham:
                    "border-narrator-muttaham bg-narrator-muttaham text-narrator-muttaham-foreground",
                kadhdhaab:
                    "border-narrator-kadhdhaab bg-narrator-kadhdhaab text-narrator-kadhdhaab-foreground",
            },
        },
        defaultVariants: {
            variant: "companion",
        },
    },
);

function NarratorBadge({
    className,
    variant,
    asChild = false,
    ...props
}: React.ComponentProps<"span"> &
    VariantProps<typeof narratorBadgeVariants> & { asChild?: boolean }) {
    const Comp = asChild ? Slot : "span";

    return (
        <Comp
            data-slot="badge"
            className={cn(narratorBadgeVariants({ variant }), className)}
            {...props}
        />
    );
}

export { NarratorBadge, narratorBadgeVariants };
