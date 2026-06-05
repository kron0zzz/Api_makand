import { Router } from "express";
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder, getOrdersTable} from "../controllers/orderController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware)

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/table", getOrdersTable);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);


export default router;
