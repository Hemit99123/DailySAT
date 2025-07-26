import mongoose from "mongoose";

let isConnected = false;

export default async function dbConnect(): Promise<void> {
    if (isConnected) return;
    await mongoose.connect(process.env.MONGO_URL!);
    isConnected = true;
}
