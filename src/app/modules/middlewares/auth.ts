import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import config from "../../config";
import userModel from "../User/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../../Error/AppError";
import { StatusCodes } from "http-status-codes";

const auth = (...auhtRole: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tokenAuth = req.headers.authorization;

    const token = tokenAuth?.split(" ")[1];
    // console.log("authrole", auhtRole);

    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Not AUthoriized");
    }
    const decoded = jwt.verify(token, config.jwt_token as string) as JwtPayload;
    const { email } = decoded;

    const user = await userModel.findOne({ email });
    // console.log(user?.role);
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, "User not FOund");
    }

    const roles = (decoded as JwtPayload).role;
    // console.log(roles);
    if (auhtRole && !auhtRole.includes(roles)) {
      // console.log(auhtRole.includes(roles));
      throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");
    }

    req.user = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };

    next();
  });
};

export default auth;
