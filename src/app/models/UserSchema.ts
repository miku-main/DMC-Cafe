import mongoose, { Schema, model } from "mongoose";

interface IUser extends mongoose.Document {
  email: string;
  password: string;
  profilePicture?: string; // Optional field for profile picture
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: "/images/user-icon.png" },
});

const User = mongoose.models.User || model<IUser>("User", UserSchema);

export default User;


