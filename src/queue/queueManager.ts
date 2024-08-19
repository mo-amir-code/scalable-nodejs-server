import { EnqueueRequestType } from "../types/threads.js";
import { ACTIVE_WORKERS_KEY, QUEUE_TASKS_KEY, TOTAL_WORKERS_KEY } from "../utils/constants.js";
import { redis } from "../utils/db.connection.js";
import { runWorker } from "./workerManager.js";


export async function addTask({retryCount = 0,payload, type, userId}:EnqueueRequestType): Promise<void> {
    try {
        const activeWorkers = await redis.get(ACTIVE_WORKERS_KEY) || 0;
        const totalWorkers = await redis.get(TOTAL_WORKERS_KEY) || 4;
        const data = {
            retryCount,
            payload,
            type,
            userId
        }

        if(activeWorkers < totalWorkers){
            await redis.incr(ACTIVE_WORKERS_KEY);
            runWorker(data).catch( async (error) => {
                if(retryCount < 3){
                    data.retryCount++;
                    console.log("Retry Count: ", data.retryCount);
                    await addTask(data);
                }else{
                    console.error("Task dropped due to many errors: ", error);
                }
            });
        }else{
            await redis.lpush(QUEUE_TASKS_KEY, JSON.stringify(data));
        }

    } catch (err) {
        console.error('Failed to enqueue request:', err);
        throw new Error('Failed to enqueue request');
    }
}

export async function dequeueTask(): Promise<any | null> {
    try {
        const task = await redis.rpop(QUEUE_TASKS_KEY);
        return task ? JSON.parse(task) : null;
    } catch (err) {
        console.error('Failed to dequeue request:', err);
        return null;
    }
}