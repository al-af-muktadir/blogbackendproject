// import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";

import sendsResponse from "../../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";

import AppError from "../../../Error/AppError";

//   const userData = req.body.users;
//   const validateUser = userValidationSchema.validate(userData);
//   if (validateUser.error) {
//     res.send({
//       succes: false,
//       message: "Validation went wrong",
//       error: validateUser.error.details,
//     });
//   }

//   const result = await userService.createUserIntoDb(userData);
//   console.log(userData);
//   res.send({
//     success: true,
//     message: "DONE",
//     data: result,
//   });
// };

const BlockUser = catchAsync(async (req, res) => {
  const f1 = await userService.getUserfromDb(req.params.userId);

  if (req.user?.email === f1?.email) {
    throw new AppError(StatusCodes.FORBIDDEN, "You cannot Block Yourself");
  }
  await userService.blockFromDb(req.params.userId);

  sendsResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Succesfully blocked the user",
  });
});

export const userController = { BlockUser };
