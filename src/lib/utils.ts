import { createAuthClient } from "better-auth/react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type z from "zod";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const authClient = createAuthClient();

export type inferSchemaType<T extends z.ZodTypeAny> = z.infer<T>;
