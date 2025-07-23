import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
    title: {
        absolute: "المشجرات",
        template: "%s - المشجرات",
    },
};

export default function TreesLayout({ children }: PropsWithChildren) {
    return children;
}
