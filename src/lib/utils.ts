import { createAuthClient } from "better-auth/react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type z from "zod";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const authClient = createAuthClient();

export type inferSchemaType<T extends z.ZodTypeAny> = z.infer<T>;

export type OmitFunctions<T> = {
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    [K in keyof T as T[K] extends Function ? never : K]: T[K];
};

export function getRandomId() {
    return Math.random().toString();
}

export function downloadImage(dataUrl: string, name = "image") {
    const a = document.createElement("a");

    a.setAttribute("download", name);
    a.setAttribute("href", dataUrl);
    a.click();

    a.remove();
}

export function getIsAnyInputFocus() {
    const activeEl = document.activeElement;
    const isInputFocus =
        activeEl &&
        (activeEl.tagName === "INPUT" ||
            activeEl.tagName === "TEXTAREA" ||
            activeEl.getAttribute("contenteditable") === "true");

    return isInputFocus;
}
