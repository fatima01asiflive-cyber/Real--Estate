import User from "../models/user.model.js"; // Path verified from image_3d8a96.png
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

// 1. Test Route (To verify the API is working)
export const test = (req, res) => {
  res.json({
    message: "User API route is working!",
  });
};

// 2. Update User Profile
export const updateUser = async (req, res, next) => {
  // Verifying user is authorized (requires verifyUser middleware in your routes)
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account!"));
  }

  try {
    // If the user wants to update their password, hash it first
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true } // This returns the updated document instead of the old one
    );

    // Remove password from the response object for security
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// 3. Delete User Account
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only delete your own account!"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};
