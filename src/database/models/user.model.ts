import { model, Schema } from "mongoose";

import bcrypt from "bcrypt"

// base user Schema 
const BaseUserSchema = new Schema({
    name: {
        type: String
    },
    role: {
        types: String,
        enum: ["Customer", "Admin", "DeliveryPartner"],
    },
    isActivated: {
        type: Boolean,
        default: false
    }

})



// Customer Schema 


const CustomerSchema = new Schema({
    ...BaseUserSchema.obj,
    phone_number: {
        type: Number,
        required: [true, "Phone number is required"],
        unique: true
    },
    role: { type: String, enum: ["Customer"], default: "Customer" },
    live_location: {
        lat: Number,
        lng: Number
    },
    address: {
        type: String
    }
}, { timestamps: true });


// Delivery Partner Schema 

const DeliveryPartnerSchema = new Schema({
    ...BaseUserSchema.obj,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters long."]
    },
    phone_number: {
        type: Number,
        required: [true, "Phone number is required"],
        unique: true
    },
    role: { type: String, enum: ["DeliveryPartner"], default: "DeliveryPartner" },
    live_location: {
        lat: Number,
        lng: Number
    },
    branch: {
        type: Schema.Types.ObjectId,
        ref: "Branch"
    },
    address: {
        type: String
    }
}, { timestamps: true });

// Pre-save hook to hash password before saving admin
DeliveryPartnerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


// Admin Schema 
const AdminSchema = new Schema({
    ...BaseUserSchema.obj,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must contains at leat 6 characters."]
    },
    phone_number: {
        type: Number,
        required: [true, "Phone number is required"],
        unique: true
    },
    role: { type: String, enum: ["Admin"], default: "Admin" },

}, { timestamps: true });

// Pre-save hook to hash password before saving admin
AdminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


const Customer = model("Customer", CustomerSchema);
const DeliveryPartner = model("DeliveryPartner", DeliveryPartnerSchema);
const Admin = model("Admin", AdminSchema);


export {
    Customer,
    Admin,
    DeliveryPartner
}


