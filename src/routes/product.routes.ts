import { Router } from "express";
import { getAllProducts, GetProductByCategory } from "../controllers/product.controllers";

const router = Router();

router.route("/products").get(getAllProducts);
router.route("/product/:categoryId").get(GetProductByCategory)

export default router