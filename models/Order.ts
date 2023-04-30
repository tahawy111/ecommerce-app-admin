import mongoose, { model, Schema, models, Document, Model } from "mongoose";

export interface ImgType {
    public_id: string; url: string;
}

export interface IOrder {
    _id: string;
    items: any[];
    name: string;
    email: string;
    city: string;
    postalCode: string;
    streetAddress: string;
    country: string;
    totalQuantity: number;
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
}

type OrderDocument = Document & IOrder;

const OrderSchema = new Schema<OrderDocument>({
    items: Object,
    name: String,
    email: String,
    city: String,
    postalCode: String,
    streetAddress: String,
    country: String,
    totalQuantity: String,
    totalPrice: String,
}, {
    timestamps: true,
});

export default models.Order as Model<OrderDocument> || model<OrderDocument>('Order', OrderSchema);