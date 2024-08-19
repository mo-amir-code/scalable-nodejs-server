import { EnqueueRequestType } from "../types/threads.js";
import { workerData, parentPort } from "worker_threads";

// Function to process a task
function processTask(task: EnqueueRequestType) {
  switch(task.type){
    case "post":
      setTimeout(() => {
        parentPort?.postMessage("Post uploaded");
      }, 1_000);
      break;
    case "video":
      setTimeout(() => {
        parentPort?.postMessage("Video uploaded");
      }, 4_000);
      break;
    case "otp":
      setTimeout(() => {
        parentPort?.postMessage("OTP resent");
      }, 1_000);
      break;
    default:
      parentPort?.postMessage("Type did not match");
  }
}

try {
  processTask(workerData);
} catch (error) {
  // If task fails, throw an error to trigger retry in the main thread
  parentPort?.postMessage(error);
  throw error;
}
