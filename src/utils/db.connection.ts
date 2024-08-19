import mongoose from "mongoose";
import { Redis } from 'ioredis';
import { DB_URI, ENVIRONMENT, REDIS_URI } from "../config/index.js";

const connectToDB = async () => {
    try {
        
        if(mongoose.connection.readyState !== 1){
            await mongoose.connect(DB_URI as string);
            console.log("Database is connected!");
        }else{
            console.log("DB is already connected!")
        }

    } catch (error) {
        console.error("Error: While DB Connection => ", error);
    }
}


let redis:Redis;

if(ENVIRONMENT === "development") {
    redis = new Redis({
        host: "localhost",
        port: 6379
    })
}else {
    redis = new Redis(REDIS_URI as string);
}

redis.on("connect", () => {
    console.log("Redis connected....!");
});

redis.on("error", (err) => {
    console.error("Redis Error: ", err);
});


export {
    connectToDB,
    redis
}