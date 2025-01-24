import express from "express";
import { userController } from "./user.controller";
import auth from "../middlewares/auth";
const router = express.Router();

router.patch(
  "/admin/users/:userId/block",
  auth("admin"),
  userController.BlockUser,
);

export const Userrouter = router;
