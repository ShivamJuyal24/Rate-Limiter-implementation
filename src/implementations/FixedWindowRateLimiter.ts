import type {bucket} from "../models/Bucket.ts";
import type {RateLimiter} from "../interfaces/RateLimiter.ts";


export class FixedWindowRateLimiter implements RateLimiter {
    private readonly buckets = new Map<string,bucket>();
    constructor(private readonly maxRequests: number, private readonly windowSize: number){}

    allowRequest(userId: string): boolean {
        const now = Date.now();
        // Check if the user has a bucket
        let bucket = this.buckets.get(userId);

        if(!bucket){
            // If not, create a new bucket for the user
            bucket = {count: 1, windowStart: now};
            this.buckets.set(userId, bucket);
            return true;
        }

        // If the user has a bucket, check if the window has expired
        const windowExpired = now - bucket.windowStart >= this.windowSize;
        if(windowExpired){
            // If the window has expired, reset the bucket
            bucket.count = 1;
            bucket.windowStart = now;
            return true;
        }
        bucket.count++;

        return bucket.count <= this.maxRequests;
    }
}