import { FixedWindowRateLimiter } from "./implementations/FixedWindowRateLimiter.js";

const limiter = new FixedWindowRateLimiter(5, 10000); // 5 requests per 10 seconds

// Simulate requests from a user
const userId = "Shivam";

for( let i=0;i< 20; i++){
    const allowed = limiter.allowRequest(userId);
    console.log(`Request ${i + 1} for user ${userId}: ${allowed ? "Allowed" : "Blocked"}`);
}