import type {TokenBucket} from '../models/TokenBucket.js'
import type {RateLimiter} from '../interfaces/RateLimiter.js'

export class TokenBucketRateLimiter implements RateLimiter {
    private readonly buckets = new Map<string, TokenBucket>();
    constructor(private readonly capacity: number, private readonly refillRate: number){}

    allowRequest(userId: string): boolean {

        const now = Date.now();
        // check if user has a bucket
        let bucket = this.buckets.get(userId);
        if(!bucket){
            // if not, create a new bucket for the user
            bucket = {token: this.capacity, lastRefill: now};
            this.buckets.set(userId, bucket);
        }

        // refill the bucket based on the time passed since the last refill
        const timePassed = now- bucket.lastRefill;
        const tokensToAdd = (timePassed / 1000) * this.refillRate;
        bucket.token = Math.min(bucket.token + tokensToAdd, this.capacity);
        bucket.lastRefill = now;

        //check if the user has enough tokens to allow the request
        if(bucket.token < 1){
            return false;
        }

        // deduct a token from the bucket and allow the request
        bucket.token -= 1;
        return true;
    }
}