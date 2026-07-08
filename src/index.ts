import { connectRedis, redisClient } from "./services/Redis.js";
import { RedisFixedWindowRateLimiter } from "./distributed/RedisFixedWindow.js";

async function main() {
    // ✅ First connect
    await connectRedis();

    // Now Redis is ready
    await redisClient.set("hello", "world");

    console.log(await redisClient.get("hello"));

    const limiter = new RedisFixedWindowRateLimiter(5, 10);

    const userId = "Shivam";

    for (let i = 1; i <= 10; i++) {
        const allowed = await limiter.allowRequest(userId);

        console.log(
            `Request ${i}: ${allowed ? "✅ Allowed" : "❌ Blocked"}`
        );
    }

    process.exit(0);
}

main();