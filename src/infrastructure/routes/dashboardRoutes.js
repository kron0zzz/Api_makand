import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import authorize from "../../middlewares/authorize.js";
import { getDashboardStatsHandler } from "../controllers/dashboardController.js";

const router = Router();

router.use(authMiddleware);

router.get("/", authorize("Ver Dashboard"), getDashboardStatsHandler);

export default router;
