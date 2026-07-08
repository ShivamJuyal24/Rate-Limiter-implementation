import type { RateLimiter } from "../interfaces/RateLimiter.js";
import { redisClient } from "../services/Redis.js";

export class RedisFixedWindowRateLimiter implements RateLimiter {
    constructor(
        private readonly limit: number,
        private readonly windowSize: number // seconds
    ) {}

    async allowRequest(userId: string): Promise<boolean> {
        const key = `rate_limit:${userId}`;

        // Atomically increment the request count
        const currentCount = await redisClient.incr(key);

        // First request → start the window
        if (currentCount === 1) {
            await redisClient.expire(key, this.windowSize);
        }

        return currentCount <= this.limit;
    }
}