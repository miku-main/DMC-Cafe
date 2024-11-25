import { NextResponse } from "next/server";
import connectMongo from "../../../utils/connectMongo";
import Task from "../../../models/Task";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

// DELETE handler for deleting a specific task
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectMongo();

        const session = await getServerSession(authOptions);
        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = params; // Extract task ID from route parameters
        console.log(`Deleting task with ID: ${id} for user: ${session.user.id}`);

        const deletedTask = await Task.findOneAndDelete({
            _id: id,
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

// PUT handler for updating a specific task
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectMongo();

        const session = await getServerSession(authOptions);
        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = params; // Extract task ID from route parameters
        const body = await request.json(); // Parse the request body
        console.log(`Updating task with ID: ${id} for user: ${session.user.id}`);

        // Update the task in the database
        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, userId: session.user.id }, // Ensure the task belongs to the logged-in user
            { completed: body.completed }, // Update only the 'completed' field
            { new: true } // Return the updated document
        );

        if (!updatedTask) {
            return NextResponse.json({ error: "Task not found or unauthorized" }, { status: 404 });
        }

        return NextResponse.json(updatedTask); // Return the updated task
    } catch (error) {
        console.error("Error updating task:", error);
        return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
    }
}
