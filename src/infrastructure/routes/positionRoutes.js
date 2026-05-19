import { Router } from "express";
import { createPosition, getPositions, getPositionById, updatePosition, deletePosition} from "../controllers/positionController.js";

const router = Router();

router.post("/", createPosition);
router.get("/", getPositions);
router.get("/:id", getPositionById);
router.put("/:id", updatePosition);
router.delete("/:id", deletePosition);


export default router;
