import express from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../middlewares/validateRequest";
import { userValidation } from "../User/user.validationSchema";
import { loginValidation } from "./auth.validation";

const authRoute = express.Router();
authRoute.post(
  "/register",
  validateRequest(userValidation.userValidationSchema),
  AuthController.register,
);
authRoute.post(
  "/login",
  validateRequest(loginValidation.loginValidationSchema),
  AuthController.login,
);
export default authRoute;
