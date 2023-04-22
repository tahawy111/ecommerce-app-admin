import mongoose, { model, Schema, models, Document, Model } from "mongoose";

export interface ICategory {
    _id: string;
    name: string;
    parent?: ICategory | string;
    createdAt?: string;
    updatedAt?: string;
    properties: any[];
}

type CategoryDocument = Document & ICategory;

const CategorySchema = new Schema<CategoryDocument>({
    name: { type: String, required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    properties: [{ type: Object }],
}, {
    timestamps: true,
});

export default models.Category as Model<CategoryDocument> || model<CategoryDocument>('Category', CategorySchema);