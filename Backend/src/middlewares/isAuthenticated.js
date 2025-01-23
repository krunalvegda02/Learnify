import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const isAuthenticated = asyncHandler(async (req, res, next) => {
  const usertoken = req.cookies?.accessToken;
  //  { console.log("usertoken", req.cookies?.accessToken);}

  if (!usertoken) {
    throw new ApiError(401, "User Not Authenticated");
  }

  const decode = jwt.verify(usertoken, process.env.ACCESS_TOKEN_SECRET);
  // console.log("Decoded Token in middleware", decode);
  if (!decode) {
    throw new ApiError(401, "Invalid Access Token");
  }

  const user = await User.findById(decode?._id).select(
    "-password -refreshToken"
  );
  if (!user) {
    throw new ApiError(401, "invalid access token");
  }

  req.user = user;

  next();
});

export default isAuthenticated;
