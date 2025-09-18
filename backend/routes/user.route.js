import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { body } from "express-validator";
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

// Register route
router.post(
  "/register",
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters long"),
  userController.registerUser
);
// Login route
router.post(
  "/login",
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 3 }).withMessage("Password is required"),
  userController.loginUser
);

// router.put(
//   "/updateProfile",
//   authMiddleware.authenticate,
//   userController.updateProfile
// );
// console.log(register);

export default router;
