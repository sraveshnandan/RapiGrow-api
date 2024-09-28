import { Model, Models } from "mongoose";
import { Customer, DeliveryPartner } from "../database/models";


const updateUser = async (req: any, res: any) => {
    try {
        const { userId } = req.user;
        const updateData = req.body;


        let user: any = await Customer.findById(userId) || DeliveryPartner.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "Account not found."
            })
        }

        let UserModel: Model<any>;

        if (user.role === "Customer") {
            UserModel = Customer
        } else if (user.role === "DeliveryPartner") {
            UserModel = DeliveryPartner
        } else {
            return res.status(403).json({
                message: "Invalid user role."
            })
        }
        const updatedUser = await UserModel.findByIdAndUpdate(
            { _id: userId },
            {
                $set: updateData
            },
            {
                new: true, runValidators: true
            });


        res.status(200).json({
            message: "Account updated successfully.",
            user: updatedUser
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error."
        })

    }
}

export { updateUser }