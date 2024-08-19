import { RefereshAndAccessTokenType } from "../types/controllers/index.js";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRY_TIME,
  REFRESH_TOKEN_EXPIRY_TIME,
} from "./constants.js";
import { JWT_SECRET } from "../config/index.js";

const generateRefreshAndAcessToken = (
  userId: string
): RefereshAndAccessTokenType => {
  const accessToken = jwt.sign({ userId }, JWT_SECRET as string, {
    expiresIn: ACCESS_TOKEN_EXPIRY_TIME,
  });
  const refreshToken = jwt.sign({ userId }, JWT_SECRET as string, {
    expiresIn: REFRESH_TOKEN_EXPIRY_TIME,
  });

  return {
    accessToken,
    refreshToken,
  };
};

export {
    generateRefreshAndAcessToken
}