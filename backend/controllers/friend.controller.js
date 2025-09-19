import User from "../models/user.model.js";

export const addFriend = async (req, res) => {
  try {
    const myId = req.user._id;
    const { friendId } = req.body;

    if (myId === friendId) return res.status(400).json({ message: "Cannot add yourself as friend." });

    const user = await User.findById(myId);
    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: "Already friends." });
    }

    user.friends.push(friendId);
    await user.save();

    res.status(200).json({ message: "Friend added." });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const removeFriend = async (req, res) => {
  try {
    const myId = req.user._id;
    const { friendId } = req.body;

    const user = await User.findById(myId);
    user.friends = user.friends.filter(id => id.toString() !== friendId);
    await user.save();

    res.status(200).json({ message: "Friend removed." });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};