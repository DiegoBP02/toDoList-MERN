import User from "../Models/UserSchema.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
import attachCookies from "../utils/attachCookies.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values!");
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use!");
  }

  const user = await User.create(req.body);

  const token = await user.createJWT();
  attachCookies({ res, token });

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values!");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new BadRequestError("Invalid Credentials!");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequestError("Invalid Credentials!");
  }

  const token = await user.createJWT();
  user.password = undefined;

  attachCookies({ res, token });
  res.status(StatusCodes.OK).json({ user });
};

const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user });
};

const logoutUser = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "User logged out!" });
};

export { register, login, getCurrentUser, logoutUser };
