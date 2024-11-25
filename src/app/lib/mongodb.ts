import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI || ""; // Add a fallback to avoid undefined
const options = {};

if (!uri) {
    throw new Error("Please add your Mongo URI to the .env file");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
    // Use a global variable in development to avoid multiple instances of the MongoClient
    if (!(global as any)._mongoClientPromise) {
        client = new MongoClient(uri, options);
        (global as any)._mongoClientPromise = client.connect();
    }
    clientPromise = (global as any)._mongoClientPromise;
} else {
    // In production, do not use a global variable
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;
