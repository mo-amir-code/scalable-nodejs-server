import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import { corsOptions } from "./config/index.js";
import routes from "./routes/index.js"
import { errorHandler } from "./middlewares/index.js";
import { connectToDB } from "./utils/db.connection.js";
import morgan from "morgan";
import { setWorkerStuff } from "./queue/workerManager.js";
import promClient from "prom-client";
import responseTime from "response-time"


const app: Express = express();

connectToDB()
setWorkerStuff();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));

const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics({ register: promClient.register });

const reqResTime = new promClient.Histogram({
    name: "http_express_request_response_time",
    help: "This tells how much time is taken by request and response",
    labelNames: ["method", "route", "status_code"],
    buckets: [1, 50, 100, 200, 400, 500, 1000, 2000]
})

app.use(responseTime((req, res, time) => {
    reqResTime.labels({
        method: req.method,
        route: req.url,
        status_code: res.statusCode.toString()
    }).observe(time);
}));

app.use("/api", routes);

app.get("/metrics", async (req, res) => {
    res.setHeader("Content-Type", promClient.register.contentType);
    const metrics = await promClient.register.metrics();
    res.send(metrics);
});


app.use(errorHandler);

export default app;