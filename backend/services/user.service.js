import User from "../models/user.model.js";

export const createUser = async ({ name, email, password }) => {
  if (!email || !password || !name) {
    throw new Error("Name, email and password are required");
  }

  if(await User.findOne({ name })) {
    throw new Error("Username already exists");
  }
  if (await User.findOne({ email })) {
    throw new Error("Email already exists");
  }
  console.log("Nameeeeeeeeeeeeeeeeeeeeeeeeeeeeee", name);

  const hashPassword = await User.hashPassword(password);

  const user = new User({
    name,
    email,
    password: hashPassword,
  });
  await user.save();
  return user;
};

export const getUsers = async ({ userId }) => {
  try {
    const users = await User.find({ _id: { $ne: userId } })
      .select("-password -__v")
      .lean();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};
