import express, { Router } from "express";
import authRoutes from "./auth.routes.js"
import tasksRoutes from "./tasks.routes.js";
import { validateUser } from "../../middlewares/user.middleware.js";

const router: Router = express.Router();


router.use("/auth", authRoutes);
router.use("/task", validateUser, tasksRoutes);


export default router;