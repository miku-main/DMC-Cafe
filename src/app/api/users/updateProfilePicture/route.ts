import { NextResponse } from "next/server";
import connectMongo from "../../../utils/connectMongo";
import User from "../../../models/UserSchema";

export async function POST(req: Request) {
  try {
    const { userId, profilePicture } = await req.json();

    console.log("Payload received:", { userId, profilePicture });

    if (!userId || !profilePicture) {
      console.error("Missing userId or profilePicture");
      return NextResponse.json(
        { error: "User ID and profile picture are required." },
        { status: 400 }
      );
    }

    await connectMongo();
    console.log("MongoDB connected.");

    const user = await User.findByIdAndUpdate(
      userId,
      { profilePicture },
      { new: true } // Return the updated document
    );

    if (!user) {
      console.error("User not found:", userId);
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    console.log("Profile picture updated successfully:", user);

    // Redirect to the home page
    return NextResponse.json({
      message: "Profile picture updated successfully!",
      redirect: "/", // Redirect to the home page
    });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
