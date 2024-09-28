import { NextFunction } from "express";
import jwt from "jsonwebtoken"
import { ACCESS_TOKEN_SECRET } from "../config";

const Authenticate = async (req: any, res: any, next: NextFunction) => {
    try {
        const AuthHeader = req.headers['authorization'];
        if (!AuthHeader) {
            return res.status(401).json({
                message: "Access denied"
            })
        }
        const token = AuthHeader.split(" ")[1];
        const decoded = await jwt.verify(token, ACCESS_TOKEN_SECRET!);
        req.user = decoded;
        return next()

    } catch (error) {
        return res.status(403).json({ message: "Unable to verify your token." })

    }
}


export { Authenticate }