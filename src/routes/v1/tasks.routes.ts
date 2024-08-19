import express, { Router } from "express";
import { resendOtp, sendPost, uploadVideo } from "../../controllers/v1/tasks.controller.js";


const router: Router = express.Router();

router.post("/post", sendPost);
router.post("/video", uploadVideo);
router.post("/resend-otp", resendOtp);

export default router;
