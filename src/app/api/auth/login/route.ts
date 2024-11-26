import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "../../../models/UserSchema";
import connectMongo from "../../../utils/connectMongo";

export async function POST(request: Request) {
  try {
    // Connect to MongoDB
    await connectMongo();

    // Parse the JSON body from the request
    const { email, password } = await request.json();

    // Validate email and password
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 400 }
      );
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 400 }
      );
    }

    // Return a success response with the user's ID
    return NextResponse.json({
      message: "Login successful",
      userId: user._id, // Pass user ID to the frontend
    });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
