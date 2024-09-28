import { Router } from "express";
import { Authenticate } from "../middlewares";
import { ConfirmOrder, CreateOrder, GetOrders, UpdateOrderStatus } from "../controllers/order.controllers";

const router = Router();

router.route("/order").post(Authenticate, CreateOrder);
router.route("/order").get(Authenticate, GetOrders);
router.route("/order/:orderId/confirm").patch(Authenticate, ConfirmOrder);
router.route("/order/:orderId/status").patch(Authenticate, UpdateOrderStatus);

export default router