import mongoose, { Schema, Document, model } from "mongoose";

interface ITask extends Document {
    userId: mongoose.Types.ObjectId; // Add userId to associate tasks with a user
    title: string;
    dueDate: string;
    priority: number;
    completed: boolean;
    imageUrl: string;
}

const TaskSchema: Schema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
    title: { type: String, required: true },
    dueDate: { type: String },
    priority: { type: Number, required: true },
    completed: { type: Boolean, default: false },
    imageUrl: { type: String },
});

const Task = mongoose.models.Task || model<ITask>("Task", TaskSchema);

export default Task;
