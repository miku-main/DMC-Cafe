import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined in the environment variables.");
}

let isConnected = false; // To prevent multiple connections in development

const connectMongo = async () => {
    if (isConnected) {
        console.log("MongoDB is already connected.");
        return;
    }

    try {
        console.log("Attempting to connect to MongoDB...");
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as mongoose.ConnectOptions); // Add ConnectOptions for type safety

        isConnected = true;
        console.log("Connected to MongoDB successfully.");
    } catch (error) {
        // Use a type guard to safely access the error message
        if (error instanceof Error) {
            console.error("Error connecting to MongoDB:", error.message);
        } else {
            console.error("Unknown error occurred while connecting to MongoDB:", error);
        }
        throw new Error("Failed to connect to MongoDB");
    }
};

export default connectMongo;

