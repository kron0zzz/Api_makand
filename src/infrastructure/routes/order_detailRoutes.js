import { Router } from "express";
import { createOrder_detail, getOrder_details, getOrder_detailById, updateOrder_detail, deleteOrder_detail, getOrder_detailsTable} from "../controllers/order_detailController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware)

router.post("/", createOrder_detail);
router.get("/", getOrder_details);
router.get("/table", getOrder_detailsTable);
router.get("/:id", getOrder_detailById);
router.put("/:id", updateOrder_detail);
router.delete("/:id", deleteOrder_detail);


export default router;
