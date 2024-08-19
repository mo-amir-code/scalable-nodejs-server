import os from "os";
import { redis } from "../utils/db.connection.js";
import { ACTIVE_WORKERS_KEY, QUEUE_TASKS_KEY, TOTAL_WORKERS_KEY } from "../utils/constants.js";
import { EnqueueRequestType } from "../types/threads.js";
import { Worker } from "worker_threads";
import { dequeueTask } from "./queueManager.js";

const setWorkerStuff = async () => {
  await redis.set(TOTAL_WORKERS_KEY, os.cpus().length);
  await redis.set(ACTIVE_WORKERS_KEY, 0);
};

const runWorker = (task: EnqueueRequestType) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./dist/queue/worker.js", {
      workerData: task,
    });

    worker.on("message", (result) => {
      console.log(result);
      resolve(result);
      workerTerminate();
    });

    worker.on("error", (err) => {
      console.error("Worker Error: ", err);
      reject(err);
      workerTerminate();
    });

    // worker.on("exit", (code) => {
    //   if (code !== 0) {
    //     reject(new Error(`Worker stopped with exit code ${code}`));
    //   }
    //   workerTerminate("exit");
    // });

    async function workerTerminate() {
      await redis.decr(ACTIVE_WORKERS_KEY);
      const nextTask = await dequeueTask();
      if (nextTask) {
        runWorker(nextTask).then(resolve).catch(reject);
      }else{
        resolve("No more task");
      }
    }
  });
};

export { setWorkerStuff, runWorker };
