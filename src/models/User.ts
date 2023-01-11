import { Schema, model, connection, Model } from 'mongoose';

// User Schema

type UserType = {
    name: string;
    birthdate: string;
    email: string;
    password?: string;
}

const schema = new Schema<UserType>({
    name: { type: String, required: true },
    birthdate: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

export default (connection && connection.models["User"]) ? connection.models["User"] as Model<UserType> : model<UserType>("User", schema);
