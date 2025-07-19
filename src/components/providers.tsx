import { TRPCReactProvider } from "@/trpc/react";
import { DirectionProvider } from "@radix-ui/react-direction";
import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <div dir="rtl">
            <TRPCReactProvider>
                <DirectionProvider dir="rtl">
                    <ThemeProvider
                        defaultTheme="dark"
                        storageKey="sanad-ui-theme"
                    >
                        {children}
                    </ThemeProvider>
                </DirectionProvider>
            </TRPCReactProvider>
        </div>
    );
}
