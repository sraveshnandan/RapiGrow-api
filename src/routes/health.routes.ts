import { Router } from "express";
import { getServerHealth } from "../controllers/health.controllers";

const router = Router();

router.route("/health").get(getServerHealth)

export default router