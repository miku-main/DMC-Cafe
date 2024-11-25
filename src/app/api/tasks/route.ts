import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Task from "../../models/Task"; // Adjusted to the correct relative path
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions"; // Adjust path to your authOptions

const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
const connectMongo = async () => {
    if (!MONGO_URI) {
        throw new Error("MONGO_URI is undefined. Check your .env file.");
    }

    if (mongoose.connection.readyState === 0) {
        try {
            console.log("Connecting to MongoDB...");
            await mongoose.connect(MONGO_URI); // Mongoose v6+ doesn't require extra options
            console.log("MongoDB connected successfully.");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            throw new Error("Failed to connect to MongoDB");
        }
    }
};

// GET Request: Fetch tasks associated with the logged-in user
export async function GET() {
    try {
        await connectMongo();

        // Authenticate the user session
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        console.log(`Fetching tasks for user ID: ${session.user.id}`);
        const tasks = await Task.find({ userId: session.user.id }); // Fetch tasks for the logged-in user

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

        // Authenticate the user session
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        console.log("Task received:", body);

        const newTask = new Task({
            ...body,
            userId: session.user.id, // Associate the task with the logged-in user's ID
        });

        console.log("Saving task to database...");
        const savedTask = await newTask.save();
        console.log("Task saved:", savedTask);

        return NextResponse.json(savedTask, { status: 201 });
    } catch (error) {
        console.error("Error saving task:", error);
        return NextResponse.json({ error: "Failed to save task" }, { status: 500 });
    }
}
