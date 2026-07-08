export interface RateLimiter {
    allowRequest(userId: string): Promise<boolean>;
}