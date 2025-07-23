import "@/styles/globals.css";

import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sooner";
import { site } from "@/constants/site";
import { env } from "@/env";
import type { Metadata } from "next";
import { Cairo } from "next/font/google";

export const metadata: Metadata = {
    metadataBase: new URL(env.NEXT_PUBLIC_WEBSITE_URL),
    title: {
        default: `${site.name} - ${site.title}`,
        template: `%s - ${site.name}`,
    },
    description: site.description,
    keywords: site.keywords,
    authors: site.authors,
    creator: site.creator.name,
    generator: "Next.js",
    // category: "",
    openGraph: {
        type: "website",
        locale: "ar",
        title: `${site.name} - ${site.title}`,
        siteName: site.name,
        description: site.description,
        url: site.url,
        images: `${site.url}/og.png`,
    },
    twitter: {
        card: "summary_large_image",
        title: `${site.name} - ${site.title}`,
        description: site.description,
        images: `${site.url}/og.png`,
        creator: site.creator.x,
    },
    icons: {
        icon: `${site.url}/logo.png`,
    },
};

const cairo = Cairo({
    subsets: ["arabic"],
    variable: "--font-cairo",
    weight: ["300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="ar"
            dir="rtl"
            className={`${cairo.className}`}
            suppressHydrationWarning
        >
            <body>
                <Providers>{children}</Providers>
                <Toaster richColors />
            </body>
        </html>
    );
}
