import mongoose, { Schema, model } from "mongoose";

// Interface for the User document
interface IUser extends mongoose.Document {
  email: string;
  password: string;
}

// Define the User schema
const UserSchema: Schema<IUser> = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store the hashed password directly
});

// Create the User model
const User = mongoose.models.User || model<IUser>("User", UserSchema);

export default User;

