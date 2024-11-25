import { NextResponse } from "next/server";
import connectMongo from "../../../utils/connectMongo";
import User from "../../../models/UserSchema";
import bcrypt from "bcryptjs";

// This function handles POST requests
export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse JSON body
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await connectMongo();
    console.log("MongoDB connected.");

    // Check if user already exists
    console.log(`Checking if user with email ${email} exists...`);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists:", existingUser);
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 409 }
      );
    }

    // Hash the password and save it directly to the schema
    console.log("Raw Password (Before Hashing):", password);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Generated Hashed Password:", hashedPassword);

    const newUser = new User({ email, password: hashedPassword });

    // Save the user
    console.log("Saving new user to database...");
    await newUser.save();
    console.log("User Saved to Database:", newUser);

    // Respond with success
    return NextResponse.json(
      {
        message: "Account created successfully",
        user: { id: newUser._id, email: newUser.email },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

