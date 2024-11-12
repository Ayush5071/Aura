import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import { setToken } from "../helper/setToken.js";

export const registerUser = async (req, res) => {
  const { name, email, password, contactNumber } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });
    }

    user = new User({
      name,
      email,
      password,
      contactNumber,
    });

    await user.save();

    const { _id, role } = user;

    setToken(res, { _id, role });

    res
      .status(201)
      .json({ success: true, message: "User registered successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Server error", message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }

    console.log("user aa gya", user);

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }
    console.log(isMatch, "milahu");

    const { _id, role } = user;

    console.log(_id, role, "sayd issue h");

    setToken(res, { _id, role });

    res.json({ success: true, message: "Logged in successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Serv error", message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select("-password")
      .populate("mySchedules");

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Server error", message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Server error", message: error.message });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    console.log("aya");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedData = {
      ...req.body,
      image: req.file ? req.file.path : user.image,
    };

    console.log(updatedData);

    user.name = updatedData.name || user.name;
    user.image = updatedData.image || user.image;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Failed to update profile:", error);
    res.status(500).json({ message: "Failed to update profile", error: error.message });
  }
};
