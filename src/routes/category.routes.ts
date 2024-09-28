import { Router } from "express";
import { GetAllCategories } from "../controllers/category.contaollers";

const router = Router();
router.route("/categories").get(GetAllCategories)

export default router