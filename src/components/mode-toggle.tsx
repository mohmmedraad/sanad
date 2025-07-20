"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { MonitorIcon, MoonIcon, SunIcon } from "./icons";
import { Card } from "./ui/card";

type ModeToggleButtonProps = React.ComponentProps<typeof Button>;

export function ModeToggleButton(props: ModeToggleButtonProps) {
    const { setTheme, theme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" {...props}>
                    <SunIcon className="dark:-rotate-90 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0" />
                    <MoonIcon
                        className={cn(
                            "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all",
                            {
                                "rotate-0 scale-100": theme === "dark",
                            },
                        )}
                    />
                    <MonitorIcon
                        className={cn(
                            "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all",
                            {
                                "rotate-0 scale-100": theme === "system",
                            },
                        )}
                    />
                    <span className="sr-only">تبديل المظهر</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    <SunIcon />
                    فاتح
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <MoonIcon />
                    داكن
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    <MonitorIcon />
                    حسب النظام
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

type CardProps = React.ComponentProps<typeof Card>;

export function ModeToggleGroup({ className, ...props }: CardProps) {
    const { setTheme, theme } = useTheme();

    return (
        <Card
            className={cn(
                "max-w-[150px] flex-row justify-end gap-2 p-1",
                className,
            )}
            {...props}
        >
            <Button
                size="xs"
                variant={theme === "light" ? "secondary" : "ghost"}
                onClick={() => setTheme("light")}
            >
                <SunIcon />
                <span className="sr-only">فاتح</span>
            </Button>

            <Button
                size="xs"
                variant={theme === "dark" ? "secondary" : "ghost"}
                onClick={() => setTheme("dark")}
            >
                <MoonIcon />
                <span className="sr-only">داكن</span>
            </Button>

            <Button
                size="xs"
                variant={theme === "system" ? "secondary" : "ghost"}
                onClick={() => setTheme("system")}
            >
                <MonitorIcon />
                <span className="sr-only">النظام</span>
            </Button>
        </Card>
    );
}
