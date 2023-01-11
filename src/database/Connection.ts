import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

// Connecting to the database -----------------------------------

export default async function mongoConnect() {
    try {
        await mongoose.connect(process.env.MONGOURL as string);
    } catch (error) {
        console.log(error);
    }
}

