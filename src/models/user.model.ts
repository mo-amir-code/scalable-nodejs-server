import mongoose, { Document, Schema } from "mongoose";
import { UserType } from "../types/schema.types.js";

const userSchema: Schema<UserType> = new Schema<UserType>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User ||
  mongoose.model<UserType>("User", userSchema);