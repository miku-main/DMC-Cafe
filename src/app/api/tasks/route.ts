import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Task from "../../models/Task"; // Adjust path to your Task schema
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions"; // Adjust path to authOptions

const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
const connectMongo = async () => {
    if (!MONGO_URI) {
        throw new Error("MONGO_URI is undefined. Check your .env file.");
    }

    if (mongoose.connection.readyState === 0) {
        try {
            console.log("Connecting to MongoDB...");
            await mongoose.connect(MONGO_URI);
            console.log("MongoDB connected successfully.");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            throw new Error("Failed to connect to MongoDB");
        }
    }
};

// GET Request: Fetch tasks associated with the logged-in user
export async function GET(request: Request) {
    try {
        await connectMongo();

        const session = await getServerSession(authOptions);
        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const tasks = await Task.find({ userId: session.user.id });
        return NextResponse.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
    }
}

// POST Request: Save a new task for the logged-in user
export async function POST(request: Request) {
    try {
        await connectMongo();

        const session = await getServerSession(authOptions);
        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const newTask = new Task({ ...body, userId: session.user.id });

        const savedTask = await newTask.save();
        return NextResponse.json(savedTask, { status: 201 });
    } catch (error) {
        console.error("Error saving task:", error);
        return NextResponse.json({ error: "Failed to save task" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        await connectMongo();

        const session = await getServerSession(authOptions);
        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const url = new URL(request.url);
        const taskId = url.pathname.split("/").pop(); // Extract task ID from the URL

        if (!taskId) {
            return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
        }

        const deletedTask = await Task.findOneAndDelete({
            _id: taskId,
            userId: session.user.id, // Ensure the task belongs to the logged-in user
        });

        if (!deletedTask) {
            return NextResponse.json({ error: "Task not found or unauthorized" }, { status: 404 });
        }

        return NextResponse.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
    }
}
