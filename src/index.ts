import { SlidingWindowRateLimiter } from "./implementations/SlidingWindowRateLimiter.js";

const limiter = new SlidingWindowRateLimiter(5, 10_000);

const userId = "user1";

let request = 1;

const interval = setInterval(() => {
    const allowed = limiter.allowRequest(userId);

    console.log(
        `${new Date().toLocaleTimeString()} | Request ${request}: ${
            allowed ? "✅ Allowed" : "❌ Blocked"
        }`
    );

    request++;

    if (request > 22) {
        clearInterval(interval);
    }
}, 1000);