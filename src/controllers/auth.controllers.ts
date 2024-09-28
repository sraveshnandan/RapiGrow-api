import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config";
import { Customer, DeliveryPartner } from "../database/models";
import bcrypt, { compareSync } from "bcrypt"


const GenerateAuthToken = (user: any) => {
    const accessToken = jwt.sign(
        { userId: user._id, role: user.role },
        ACCESS_TOKEN_SECRET!,
        {
            expiresIn: "1d"
        }
    );

    const refreshToken = jwt.sign(
        { userId: user._id, role: user.role },
        REFRESH_TOKEN_SECRET!,
        {
            expiresIn: "7d"
        }
    );


    return { accessToken, refreshToken }
};


const LoginCustomer = async (req: any, res: any) => {
    try {

        const { phone_number } = req.body;

        let customer = await Customer.findOne({ phone_number });

        if (!customer) {
            customer = new Customer({
                phone_number,
                role: "Customer",
                isActivated: true
            })

            await customer.save()
        }

        const { accessToken, refreshToken } = GenerateAuthToken(customer);

        return res.status(201).json({
            message: customer ? "Login Successfull" : "Account created successfull",
            accessToken,
            refreshToken,
            customer
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server error"
        })
    }
}

const LoginDeliveryPartner = async (req: any, res: any) => {
    try {

        const { email, password } = req.body;

        const deliveryPartner = await DeliveryPartner.findOne({ email });

        if (!deliveryPartner) {
            return res.status(404).json({
                message: "Account not found."
            })
        }

        const isPassMatched = compareSync(password, deliveryPartner.password);

        if (!isPassMatched) {
            return res.status(401).json({
                message: "Invalid Credientials."
            })
        }

        const { accessToken, refreshToken } = GenerateAuthToken(deliveryPartner);

        return res.status(201).json({
            message: "Login Successfull",
            accessToken,
            refreshToken,
            deliveryPartner
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server error"
        })
    }
}

const RefreshToken = async (req: any, res: any) => {
    try {
        const { RefreshToken } = req.body;
        if (!RefreshToken) {
            return res.status(401).json({
                message: "Refresh Token is required."
            })
        }

        const decoded: any = jwt.verify(RefreshToken, REFRESH_TOKEN_SECRET!)
        let user: any;
        if (decoded.role === "Customer") {
            user = await Customer.findById(decoded.userId)
        } else if (decoded.role === "DeliveryPartner") {
            user = await DeliveryPartner.findById(decoded.userId)
        } else {
            return res.status(403).json({
                message: "Invalid role."
            })
        }

        if (!user) {
            return res.status(403).json({
                message: "Invalid Refresh Token."
            })
        } else if (!user.isActivated) {
            return res.status(403).json({
                message: "Account is not activated."
            })
        }

        const { refreshToken, accessToken } = GenerateAuthToken(user);

        return res.status(200).json({
            message: "Token refreshed successfully.",
            accessToken,
            refreshToken
        })
    } catch (error) {
        return res.status(500).json({
            message: "Invalid Refresh Token."
        })
    }
}

const FetchUser = async (req: any, res: any) => {
    try {

        const { userId, role } = req.user;

        let user: any;
        if (role === "Customer") {
            user = await Customer.findById(userId)
        } else if (role === "DeliveryPartner") {
            user = await DeliveryPartner.findById(userId)
        } else {
            return res.status(403).json({
                message: "Invalid auth token."
            })
        }


        if (!user) {
            return res.status(404).json({
                message: "No account found."
            })
        }

        return res.status(200).json({
            message: "Account fetched successfully.",
            user
        })


    } catch (error) {
        return res.status(500).json({
            message: "Internal Server error."
        })
    }
}





export { LoginCustomer, LoginDeliveryPartner, RefreshToken, FetchUser }