import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    // console.log("refreshToken", refreshToken);
    await user.save({ validateBeforeSave: false }); //savind refreshtoken into database

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating Access and Refresh tokens"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json(new ApiResponse(400, "All Fields are Required"));
  }

  //If already registered with the same email
  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(400)
      .json(new ApiResponse(400, "User Already exists with this email"));
  }

  const newUser = await User.create({
    username,
    email,
    password,
  });
  if (!newUser) {
    return res.status(400).json(new ApiResponse(400, "Error Creating User"));
  }

  return res
    .status(201)
    .json(new ApiResponse(201, newUser, "User Registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "All fields must required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "User Not Found, Please Check Your Email");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Password Incorrect");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedinUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  //send secure coookies
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accesstToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, loggedinUser, "User Login Succesfull"));
});

export { registerUser, loginUser };
