import type {SlidingBucket} from '../models/SlidingBucket.js'
import type {RateLimiter} from '../interfaces/RateLimiter.js'


export class SlidingWindowRateLimiter implements RateLimiter {
    private readonly buckets = new Map<string, SlidingBucket>();
    constructor(private readonly maxRequests: number, private readonly windowSizeMillis: number){}

    allowRequest(userId: string): boolean {
        const now = Date.now();
        // Check if the user has a bucket
        let bucket = this.buckets.get(userId);

        if(!bucket){
            // If not, create a new bucket for the user
            bucket = {timestamp: [now]};
            this.buckets.set(userId, bucket);
            return true;
        }

        // Remove timestamps that are outside the window
        bucket.timestamp = bucket.timestamp.filter(timestamp => now - timestamp < this.windowSizeMillis);

        // Check if the user has exceeded the max requests
        if(bucket.timestamp.length >= this.maxRequests){
            return false;
        }

        // Add the current timestamp to the bucket 
        bucket.timestamp.push(now);

        return true;
    }

}