import {createClient} from 'redis';

// Create and configure Redis client
export const redisClient = createClient({
    url: 'redis://localhost:6379'
});

redisClient.on('error', (err)=> console.log('Redis Client Error', err));

// Connect to Redis
export async function connectRedis(){
    try{
        await redisClient.connect();
        console.log('Connected to Redis');
    }catch(err){
        console.log('Error connecting to Redis:', err);
        process.exit(1);
    }
}


