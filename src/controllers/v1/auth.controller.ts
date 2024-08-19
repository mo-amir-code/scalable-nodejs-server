import {
  accessCookieOptions,
  refreshCookieOptions,
  SALT_ROUND,
} from "../../config/index.js";
import { apiHandler, ErrorHandlerClass, ok } from "../../middlewares/index.js";
import { User } from "../../models/index.js";
import bcrypt from "bcrypt";
import {
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
} from "../../utils/constants.js";
import { generateRefreshAndAcessToken } from "../../utils/controllers.js";

const registerUser = apiHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ErrorHandlerClass("Required fields are missing", 400));
  }

  const user = await User.findOne({ username });

  if (user) {
    return next(new ErrorHandlerClass("username is not available", 400));
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

  await User.create({ username , password: hashedPassword });

  return ok({
    res,
    message: "user created",
    statusCode: 200
  });
});

const loginUser = apiHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ErrorHandlerClass("Required fields are missing", 400));
  }

  const user = await User.findOne({ username });

  if (!user) {
    return next(new ErrorHandlerClass("Username not found", 404));
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return next(
      new ErrorHandlerClass("Username or Password is incorrect", 400)
    );
  }

  const { accessToken, refreshToken } = generateRefreshAndAcessToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  res
    .cookie(ACCESS_TOKEN_NAME, accessToken, accessCookieOptions)
    .cookie(REFRESH_TOKEN_NAME, refreshToken, refreshCookieOptions);

  return ok({
    res,
    message: "You logged In",
    statusCode: 200,
    data: {
      accessToken
    }
  });
});

export { registerUser, loginUser };
