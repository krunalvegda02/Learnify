import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    console.log("refreshToken", refreshToken);
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
  console.log("acees", accessToken);

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
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        loggedinUser,
        `Welcome Back, ${loggedinUser.username}`
      )
    );
});

const logOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  //delete secure coookies
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logout seccessfully"));
});

const getUserProfile = asyncHandler(async (req, res) => {
  const userid = req.user._id;

  const user = await User.findById(userid)
    .populate({
      path: "enrolledCourses",
      populate: { path: "creator" }, // Nested population for `enrolledCourses.creator`
    })
    .select("-password -refreshToken");
  if (!user) {
    throw new ApiError(401, "User Not Found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User Profile Fetched"));
});

const updateProfile = asyncHandler(async (req, res) => {
  const userid = req.user._id;
  const { username } = req.body;
  const avatarFile = req.file;
  // console.log("avatar", req.file);

  const user = await User.findById(userid);
  if (!user) {
    throw new ApiError(401, "User not Found");
  }

  // Extract the public Id of the olf image from URL if it is exists
  if (user.avatar) {
    const publicId = user.avatar.split("/").pop().split(".")[0];
    deleteMediaFromCloudinary(publicId);
  }

  // Upload new photo
  const cloudinaryResponse = await uploadMedia(avatarFile.path);
  const avatar = cloudinaryResponse.secure_url;

  const updatedData = { username, avatar };
  const updatedUser = await User.findByIdAndUpdate(userid, updatedData, {
    new: true,
  }).select("-password -refreshToken");

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedUser, "User Profile Updated Successfully")
    );
});

export { registerUser, loginUser, logOutUser, getUserProfile, updateProfile };
