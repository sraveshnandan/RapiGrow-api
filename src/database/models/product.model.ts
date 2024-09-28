import { model, Schema } from "mongoose";

const ProductSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    quantity: {
        type: String,
        required: true
    },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true }

}, { timestamps: true })


const Product = model("Product", ProductSchema);

export { Product }