import { model, Schema } from "mongoose";
import { Counter } from "./counter.model";

const OrderSchema = new Schema({
    orderId: {
        type: String,
        required: true,
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    deliveryPartner: {
        type: Schema.Types.ObjectId,
        ref: "DeliveryPartner",
    },
    branch: {
        type: Schema.Types.ObjectId,
        ref: "Branch",
        required: true
    },
    items: [
        {
            id: {
                type: Schema.Types.ObjectId,
                ref: "Product"
            },
            item: {
                type: Schema.Types.ObjectId,
                ref: "Product"

            },
            count: { type: Number, required: true }
        }
    ],
    deliveryLocation: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        address: { type: String, required: true }
    },
    pickUpLocation: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        address: { type: String, required: true }
    },
    deliveryPersonLocation: {
        lat: { type: Number },
        lng: { type: Number },
        address: { type: String }
    },
    status: {
        type: String,
        enum: ["available", "confermed", "arriving", "delivered", "cancelled"],
        default: "available"
    },
    totalPrice: { type: Number, required: true }

}, { timestamps: true })



const GetNextSequenceValue = async (sequnceName: string) => {
    const SequenceDocument = await Counter.findOneAndUpdate(
        {
            name: sequnceName
        },
        {
            $inc: { sequenceValue: 1 }
        },
        {
            upsert: true,
            new: true
        }
    )

    return SequenceDocument?.sequenceValue

}


OrderSchema.pre("save", async function (next) {
    try {
        if (this.isNew) {
            const sequenceValue = await GetNextSequenceValue("orderId");
            if (sequenceValue) {
                this.orderId = `ORDR${sequenceValue.toString().padStart(5, "0")}`;
            } else {
                throw new Error("Failed to generate sequence value.");
            }
        }
        next();
    } catch (error) {
        next(error as any);  // Pass the error to the error-handling middleware
    }
});

const Order = model("Order", OrderSchema);


export { Order }