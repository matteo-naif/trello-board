import axios from "axios";
import { getTrelloKeyAndToken } from "@/utils/getTrelloKeyAndToken";

type RetryOptions = {
    maxRetries: number;
    baseDelayMs: number;
    backoffFactor: number;
};

type TrelloGetOptions = {
    params?: Record<string, string>;
    retryOptions?: Partial<RetryOptions>;
    logContext?: string;
};

const DEFAULT_RETRY_OPTIONS: RetryOptions = {
    // Maximum number of retry attempts
    maxRetries: 2,
    // Initial delay before the first retry (in milliseconds)
    baseDelayMs: 300,
    // Exponential backoff factor (e.g., 2 means the delay doubles with each retry)
    backoffFactor: 2,
};

const RETRY_STATUS_CODES = new Set([429, 500, 502, 503, 504]);

const trelloClient = axios.create({
    // timeout: Trello API can be slow, so we set a longer timeout
    timeout: 10000,
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isRetryableError = (error: unknown) => {
    if (!axios.isAxiosError(error)) return false;
    const status = error.response?.status;
    if (!status) return true;
    return RETRY_STATUS_CODES.has(status);
};

const stripQuery = (url?: string) => (url ? url.split("?")[0] : undefined);

const redactParams = (params?: Record<string, unknown>) => {
    if (!params) return undefined;
    const redacted = { ...params };
    if ("key" in redacted) redacted.key = "[redacted]";
    if ("token" in redacted) redacted.token = "[redacted]";
    return redacted;
};

const toSafeLog = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        return {
            message: error.message,
            code: error.code,
            status: error.response?.status,
            method: error.config?.method?.toUpperCase(),
            url: stripQuery(error.config?.url),
            params: redactParams(error.config?.params as Record<string, unknown> | undefined),
        };
    }

    if (error instanceof Error) {
        return { message: error.message };
    }

    return { message: "Unknown error" };
};

export const logTrelloError = (context: string, error: unknown) => {
    console.error(`[${context}]`, toSafeLog(error));
};

const requestWithRetry = async <T>(
    requestFn: () => Promise<T>,
    options?: Partial<RetryOptions>
): Promise<T> => {
    const { maxRetries, baseDelayMs, backoffFactor } = {
        ...DEFAULT_RETRY_OPTIONS,
        ...options,
    };

    let attempt = 0;
    while (true) {
        try {
            return await requestFn();
        } catch (error) {
            if (attempt >= maxRetries || !isRetryableError(error)) {
                throw error;
            }

            const delayMs = Math.round(baseDelayMs * Math.pow(backoffFactor, attempt));
            attempt += 1;
            await sleep(delayMs);
        }
    }
};

export const trelloGet = async <T>(
    url: string,
    options?: TrelloGetOptions
): Promise<T> => {
    const { apiKey, token } = getTrelloKeyAndToken();
    try {
        const { data } = await requestWithRetry(
            () =>
                trelloClient.get<T>(url, {
                    params: { ...options?.params, key: apiKey, token },
                }),
            options?.retryOptions
        );

        return data;
    } catch (error) {
        logTrelloError(options?.logContext ?? "trelloGet", error);
        throw error;
    }
};
