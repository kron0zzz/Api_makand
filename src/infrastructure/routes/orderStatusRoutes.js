import { Router } from "express";
import {
  createOrderStatus,
  getOrderStatuss,
  getOrderStatussTable,
  getOrderStatusById,
  updateOrderStatus,
  deleteOrderStatus
} from "../controllers/orderStatusController.js";

const router = Router();

router.get("/table", getOrderStatussTable);
router.post("/", createOrderStatus);
router.get("/", getOrderStatuss);
router.get("/:id", getOrderStatusById);
router.put("/:id", updateOrderStatus);
router.delete("/:id", deleteOrderStatus);

export default router;