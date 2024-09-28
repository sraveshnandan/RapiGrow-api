import { model, Schema } from "mongoose";

const BranchSchema = new Schema({
    name: {
        type: String,
    },
    location: {
        lat: Number,
        lng: Number
    },
    deliveryPartners: [
        {
            type: Schema.Types.ObjectId,
            ref: "DeliveryPartner"
        }
    ],
    address: String
}, { timestamps: true })


const Branch = model("Branch", BranchSchema);

export { Branch }