import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface ProductDocument extends mongoose.Document {
  user: UserDocument["_id"];
  title: string;
  description: string;
  price: number;
  image: string;
  createdAt: Date;
  updateAt: Date;
}

const productSchema = new mongoose.Schema<ProductDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    image: { type: String },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel;
