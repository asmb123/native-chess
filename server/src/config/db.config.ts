import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

export const dbInit = async (): Promise<void> => {
    const mongo_url = process.env.MONGO_URL;
    if (!mongo_url) {
        throw new Error("Mongo url not found")
    }
    await mongoose.connect(mongo_url);
}