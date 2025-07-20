"use client";

import dynamic from "next/dynamic";
const NextThemesProvider = dynamic(
    () => import("next-themes").then((e) => e.ThemeProvider),
    {
        ssr: false,
    },
);

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return (
        <NextThemesProvider attribute="class" defaultTheme="system" {...props}>
            {children}
        </NextThemesProvider>
    );
}
