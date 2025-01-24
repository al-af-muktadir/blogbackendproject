import config from "../../config";
import { user } from "../User/user.interface";
import userModel from "../User/user.model";
import { LogInuser } from "./auth.interface";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import AppError from "../../../Error/AppError";
import { StatusCodes } from "http-status-codes";
const registerUser = async (user: user) => {
  const result = await userModel.create(user);

  return result;
};

const loginUser = async (payload: LogInuser) => {
  const user = await userModel
    .findOne({ email: payload?.email })
    .select("+password");

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User nnot Found");
  }
  const userStatus = user?.isBlocked;
  if (userStatus === true) {
    throw new AppError(StatusCodes.FORBIDDEN, "user is Blocked");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  // console.log(user);
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.FORBIDDEN, "password not matched");
  }
  const token = jwt.sign(
    { email: user?.email, role: user?.role },
    config.jwt_token as string,
    { expiresIn: "200d" },
  );
  return { token, user };
};

export const AuthService = { registerUser, loginUser };
