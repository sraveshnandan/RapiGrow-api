import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express';
import bcrypt from "bcrypt"
import * as AdminJsMongoose from "@adminjs/mongoose";
import {
    Admin,
    Branch,
    Category,
    Counter,
    Customer,
    DeliveryPartner,
    Order,
    Product
} from '../database/models';




AdminJS.registerAdapter(AdminJsMongoose)

const admin = new AdminJS({
    resources: [
        {
            resource: Customer,
            options: {
                listProperties: ["phone_number", "role", "isActivated", "name"],
                filterProperties: ["name", "role", "phone_number"]
            }
        },
        {
            resource: DeliveryPartner,
            options: {
                listProperties: ["phone_number", "role", "isActivated", "email", "name"],
                filterProperties: ["phone_number", "role", "email", "name"]
            }
        },
        {
            resource: Admin,
            options: {
                listProperties: ["phone_number", "role", "isActivated", "email", "name"],
                filterProperties: ["phone_number", "role", "email"]
            }
        },
        {
            resource: Branch,
            options: {
                filterProperties: ["name", "address"]
            }
        },
        {
            resource: Category,
            options: {
                listProperties: ["name", "image"],
                filterProperties: ["name"]
            }
        },
        {
            resource: Product,
            options: {
                listProperties: ["name", "image", "price", "discountPrice", "quantity", "category"],
                filterProperties: ["name", "category"]
            }
        },
        {
            resource: Order,
        },
        {
            resource: Counter,
        }
    ],
    branding: {
        companyName: "XecureCode",
        logo: "",
        favicon: "https://res.cloudinary.com/dirdehr7r/image/upload/f_auto,q_auto/zs85ytgsr7kn6coztjwn",
        withMadeWithLove: false
    },
})


const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
    authenticate: async (email, password) => {
        const user = await Admin.findOne({ email });
        if (user) {
            // Compare the provided password with the stored hashed password
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                return user; // Successful login
            }
        }
        return null;


    },
    cookiePassword: 'your-secret-key'
});



export { admin, adminRouter }