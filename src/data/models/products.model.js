import { Schema, model, Types } from "mongoose";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true, index: true },
    description: { type: String },
    price: { type: Number, default: 1 },
    stock: { type: Number, default: 10 },
    images: [{ type: String, default: ["https://i.postimg.cc/kX8PKZpq/ipad.jpg"] }],
    onsale: { type: Boolean, default: false },
    owner_id: { type: Types.ObjectId, ref: "users", required: true },
  },
  { timestamps: true }

);

const Product = model(collection, schema);
export default Product;
