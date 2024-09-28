import { Router } from "express";
import { FetchUser, LoginCustomer, LoginDeliveryPartner, RefreshToken } from "../controllers/auth.controllers";
import { updateUser } from "../controllers/tracking.controllers";
import { Authenticate } from "../middlewares";

const router = Router();

router.route("/customer/login").post(LoginCustomer);
router.route("/delivery/login").post(LoginDeliveryPartner);
router.route("/refresh-token").post(RefreshToken);
router.route("/user").get(Authenticate, FetchUser);
router.route("/update-user").patch(Authenticate, updateUser);


export default router