import { apiHandler, ok } from "../../middlewares/error.handler.js";
import { addTask } from "../../queue/queueManager.js";

const sendPost = apiHandler(async (req, res, next) => {
  addTask({ userId: req.user._id.toString(), type: "post", payload: req.body });

  return ok({
    res,
    message: "Post sent",
    statusCode: 200
  });
});

const resendOtp = apiHandler(async (req, res, next) => {
  addTask({ userId: req.user._id.toString(), type: "otp", payload: req.body });

  return ok({
    res,
    message: "OTP sent",
    statusCode: 200
  });
});

const uploadVideo = apiHandler(async (req, res, next) => {
  addTask({ userId: req.user._id.toString(), type: "video", payload: req.body });

  return ok({
    res,
    message: "Video Upload successfully",
    statusCode: 200
  });
});

export { sendPost, resendOtp, uploadVideo };
