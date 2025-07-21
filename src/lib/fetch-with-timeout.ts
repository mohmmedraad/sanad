import { APIException } from "./api-exception";

export async function fetchWithTimeout(url: string, options = {}) {
    const timeout = 15000;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });
        clearTimeout(id);

        if (!response.ok) {
            throw new APIException("BAD_REQUEST", {
                message: `Failed to fetch data: ${response.statusText}`,
            });
        }

        return response;
    } catch (error) {
        clearTimeout(id);
        // @ts-ignore
        if (error.name === "AbortError") {
            throw new APIException("TIMEOUT", {
                message: "Request timeout. Please try again later.",
            });
        }
        throw error;
    }
}
