import { model, Schema } from "mongoose";

const Counterschema = new Schema({
    name: { type: String, required: true, unique: true },
    sequenceValue: { type: Number, default: 0 }
})


const Counter = model("Counter", Counterschema);

export { Counter }