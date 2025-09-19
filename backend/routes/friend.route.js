import express from "express";
import { authUser } from "../middleware/auth.middleware.js";
import { addFriend, removeFriend } from "../controllers/friend.controller.js";

const router = express.Router();

router.post("/add", authUser, addFriend);
router.post("/remove", authUser, removeFriend);

export default router;