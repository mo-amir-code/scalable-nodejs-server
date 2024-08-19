import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import mongoose from "mongoose";
import { apiHandler, ErrorHandlerClass } from "./error.handler.js";
import { JWT_SECRET } from "../config/index.js";

const validateUser = apiHandler(async (req, res, next) => {
  const { accesstoken } = req.cookies;

  if (!accesstoken) {
    return next(new ErrorHandlerClass("Invalid request", 401));
  }

  try {
    const decodedToken = (await jwt.verify(accesstoken, JWT_SECRET as string)) as {
      userId: mongoose.Types.ObjectId;
    };

    const user = await User.findById(decodedToken.userId).select(
      "-password -refreshToken"
    );

    if (!user) {
      return next(new ErrorHandlerClass("Invalid Access Token", 401));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorHandlerClass("Invalid Access Token", 401));
  }
});

export { validateUser };
