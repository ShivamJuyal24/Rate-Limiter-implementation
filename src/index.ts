import { TokenBucketRateLimiter } from "./implementations/TokenBucketRateLimiter.js";

const limiter = new TokenBucketRateLimiter(5, 1);

const userId = "Shivam";

let request = 1;

const interval = setInterval(() => {
    for (let i = 0; i < 2; i++) {
        const allowed = limiter.allowRequest(userId);

        console.log(
            `${new Date().toLocaleTimeString()} | Request ${request}: ${
                allowed ? "✅ Allowed" : "❌ Blocked"
            }`
        );

        request++;
    }

    if (request > 20) {
        clearInterval(interval);
    }
}, 1000);