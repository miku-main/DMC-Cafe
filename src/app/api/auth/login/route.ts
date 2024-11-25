import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "../../../models/UserSchema";
import connectMongo from "../../../utils/connectMongo";

export async function POST(request: Request) {
    try {
        await connectMongo();
        const { email, password } = await request.json();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
        }

        return NextResponse.json({ message: "Login successful", userId: user._id }); // Return the user ID
    } catch (error) {
        console.error("Error logging in:", error);
        return NextResponse.json({ error: "Error logging in" }, { status: 500 });
    }
}
