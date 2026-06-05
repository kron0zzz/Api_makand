import { Router } from "express";
import { 
  createSubRental, 
  getSubRentals, 
  getSubRentalById, 
  updateSubRental, 
  deleteSubRental, 
  getSubRentalsTable 
} from "../controllers/subRentalController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = Router();

// Protegemos los endpoints con tu middleware de autenticación
router.use(authMiddleware);

router.get("/table", getSubRentalsTable);
router.post("/", createSubRental);
router.get("/", getSubRentals);
router.get("/:id", getSubRentalById);
router.put("/:id", updateSubRental);
router.delete("/:id", deleteSubRental);

export default router;