import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

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
      .json(new ApiResponse(400, "User Already exist with this email"));
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });
  if (!newUser) {
    return res.status(400).json(new ApiResponse(400, "Error Creating User"));
  }

  return res.status(201).json(201, newUser, "User Registered Succesfully");
});

const LoginUser = asyncHandler(
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, "All fields must required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(400, "User Not Found, Please Check Your Email");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if(!isPasswordCorrect){
        throw new ApiError(400, "Password Incorrect")
    }

    
  })
);

export { registerUser };
