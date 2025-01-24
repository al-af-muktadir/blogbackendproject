import { model, Schema } from "mongoose";
import { user } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
const userSchema = new Schema<user>(
  {
    name: { type: String, required: [true, "Please Provide Name"] },
    email: {
      type: String,
      required: [true, "Please Provide Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Pass is Required"],
      select: false,
    },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true },
);
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

const userModel = model<user>("user-collection", userSchema);

export default userModel;
