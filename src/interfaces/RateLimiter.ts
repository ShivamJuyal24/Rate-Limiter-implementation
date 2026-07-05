export interface RateLimiter {
  allowRequest(userId: string): boolean;
}