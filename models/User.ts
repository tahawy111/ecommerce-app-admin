import mongoose, { model, Schema, models, Document, Model } from "mongoose";

export interface ImgType {
    public_id: string; url: string;
}

export interface IUser {
    _id: string;
    name: string;
    email: string;
    image: string;
    role: string;
    emailVerified: null;
    createdAt?: string;
    updatedAt?: string;
}

type UserDocument = Document & IUser;

const UserSchema = new Schema<UserDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png" },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    emailVerified: null
}, {
    timestamps: true,
});

export default models.User as Model<UserDocument> || model<UserDocument>('User', UserSchema);