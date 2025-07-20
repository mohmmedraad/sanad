import { TRPCError, type TRPC_ERROR_CODE_KEY } from "@trpc/server";

interface APIExceptionOptions {
    message?: string;
    cause?: unknown;
}

export class APIException extends TRPCError {
    constructor(
        statusCode: TRPC_ERROR_CODE_KEY,
        options: APIExceptionOptions = {},
    ) {
        // @ts-ignore
        super({
            code: statusCode,
            ...options,
        });
    }
}
