import { model, Schema } from "mongoose";

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true })


const Category = model("Category", CategorySchema);

export { Category }