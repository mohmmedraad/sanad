"use client";

import type { AppRouter } from "@/server/api/root";
import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
    createTRPCProxyClient,
    httpBatchStreamLink,
    loggerLink,
} from "@trpc/client";
import {
    createTRPCReact,
    type inferReactQueryProcedureOptions,
} from "@trpc/react-query";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { useState } from "react";
import SuperJSON from "superjson";
import { createQueryClient } from "./query-client";

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
    if (typeof window === "undefined") {
        // Server: always make a new query client
        return createQueryClient();
    }
    // Browser: use singleton pattern to keep the same query client
    clientQueryClientSingleton ??= createQueryClient();

    return clientQueryClientSingleton;
};

const trpcOptions = {
    links: [
        loggerLink({
            enabled: (op) =>
                process.env.NODE_ENV === "development" ||
                (op.direction === "down" && op.result instanceof Error),
        }),
        httpBatchStreamLink({
            transformer: SuperJSON,
            url: `${getBaseUrl()}/api/trpc`,
            headers: () => {
                const headers = new Headers();
                headers.set("x-trpc-source", "nextjs-react");
                return headers;
            },
        }),
    ],
};

export const api = createTRPCReact<AppRouter>();
export const apiFetch = createTRPCProxyClient<AppRouter>(trpcOptions);

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;

/**
 * Inference helper for query options.
 *
 * @example type HelloOutput = ReactQueryOptions['example']['hello']
 */
export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;

/**
 * Inference helper for query options.
 *
 * @example type HelloOutput = ReactQueryOptions['example']['hello']
 */
export type ReactMutationOptions = inferReactQueryProcedureOptions<AppRouter>;

export function TRPCReactProvider(props: { children: React.ReactNode }) {
    const queryClient = getQueryClient();

    const [trpcClient] = useState(() => api.createClient(trpcOptions));

    return (
        <QueryClientProvider client={queryClient}>
            <api.Provider client={trpcClient} queryClient={queryClient}>
                {props.children}
            </api.Provider>
        </QueryClientProvider>
    );
}

function getBaseUrl() {
    return process.env.NEXT_PUBLIC_WEBSITE_URL;
}
