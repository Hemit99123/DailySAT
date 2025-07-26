import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IUser extends Document {
    email: string;
    name: string;
    image: string;
    isReferred: boolean;
    currency: number;
    correctAnswered: number;
    wrongAnswered: number;
    itemsBought: any[];
    investors?: any[];
    plan?: any;
}

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true },
    name: String,
    image: String,
    isReferred: Boolean,
    currency: Number,
    correctAnswered: Number,
    wrongAnswered: Number,
    itemsBought: Array,
    investors: Array,
    plan: Object,
});

const User = models.User || model<IUser>('User', UserSchema);

export default User;
