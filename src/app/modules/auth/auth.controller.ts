// import { Response, Request, NextFunction } from "express";
import { AuthService } from "./auth.Service";
import sendsResponse from "../../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";

const register = catchAsync(async (req, res) => {
  const result = await AuthService.registerUser(req.body);

  sendsResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "USer Registered Succesfully",
    data: {
      _id: "string",
      name: (typeof result.name).toString(),
      email: (typeof result.email).toString(),
    },
  });
});
const login = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);

  sendsResponse(res, {
    statusCode: StatusCodes.OK,
    message: "USer Logged in  Succesfully",

    data: {
      token: result.token,
    },
  });
});

export const AuthController = { register, login };
