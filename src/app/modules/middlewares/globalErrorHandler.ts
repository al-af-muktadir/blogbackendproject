/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import { ZodError } from "zod";
import { handleZodError } from "../../../Error/ZodValidationError";
import AppError from "../../../Error/AppError";

type TError = {
  success: boolean;
  StatusCode: number;
  message: string;
  error: any;
};
export type TErrorSources = {
  path: string | number;
  message: string;
}[];

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Something Went Wrong";
  let error: TErrorSources = [
    {
      path: "",
      message: "something went wrong",
    },
  ];
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      statusCode: StatusCodes.BAD_REQUEST,
      message: err.message,
      error: err.errors.name.name,
    });
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.error;
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      statusCode: statusCode,
      message: message,
      error: error,
    });
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    error = [
      {
        path: "",
        message: err?.message,
      },
    ];
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      statusCode: statusCode,
      message: message,
      error: error,
    });
  } else if (err instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: err.message,
      error: err,
    });
  }
};

export default globalErrorHandler;
