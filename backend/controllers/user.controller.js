import userModel from "../models/user.model.js";
import * as userService from "../services/user.service.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  console.log("Name", username);

  const errors = validationResult({ username, email, password });

  if (!errors.isEmpty()) {
    console.log("Erorororororoorororo", errors);
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await userService.createUser({
      name: username,
      email: email,
      password,
    });

    const token = await user.generateJWT();

    delete user._doc.password;

    res.status(201).json({ user, token });
  } catch (error) {
    console.log("Erorororor", error.message);
    res.status(500).json({ error: error.message });
  }
};
// console.log(registerUser);

export const loginUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isMatch = await user.isValidPassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = user.generateJWT();

    delete user._doc.password;

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logoutController = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    redisClient.set(token, "logout", "EX", 24 * 60 * 60);
    res.status(200).send({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};