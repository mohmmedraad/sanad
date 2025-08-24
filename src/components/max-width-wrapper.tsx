import type { FC, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface MaxWidthWrapperProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}

const MaxWidthWrapper: FC<MaxWidthWrapperProps> = ({ className, children }) => {
    return (
        <div className={cn("mx-auto w-full max-w-5xl px-6", className)}>
            {children}
        </div>
    );
};

export default MaxWidthWrapper;
