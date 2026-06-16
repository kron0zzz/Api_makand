import { Router } from "express";
import {
  createReturn,
  getReturns,
  getReturnById,
  updateReturn,
  deleteReturn,
  getReturnsTable
} from "../controllers/returnController.js";

import authMiddleware from "../../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/", createReturn);
router.get("/", getReturns);
router.get("/table", getReturnsTable);
router.get("/:id", getReturnById);
router.put("/:id", updateReturn);
router.delete("/:id", deleteReturn);

export default router;