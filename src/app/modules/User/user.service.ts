/* eslint-disable @typescript-eslint/no-explicit-any */
import userModel from "./user.model";
import { ObjectId } from "mongodb";
const getUserfromDb = async (id: any) => {
  const result = await userModel.findOne({ _id: new ObjectId(id) });
  return result;
};

const blockFromDb = async (id: string) => {
  const result = await userModel.updateOne(
    { _id: new ObjectId(id) },
    { isBlocked: true },
  );
  return result;
};

export const userService = {
  getUserfromDb,
  blockFromDb,
};
