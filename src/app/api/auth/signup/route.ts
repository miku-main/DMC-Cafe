import { NextResponse } from "next/server";
import User from "../../../models/UserSchema";
import connectMongo from "../../../utils/connectMongo"; // Your MongoDB connection logic

export async function POST(request: Request) {
    try {
        await connectMongo();
        const { email, password } = await request.json();

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Create a new user
        const newUser = new User({ email, password });
        await newUser.save();

        return NextResponse.json({ message: "User created successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Error creating user" }, { status: 500 });
    }
}
