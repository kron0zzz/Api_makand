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
import authorize from "../../middlewares/authorize.js";

const router = Router();

// Protegemos los endpoints con tu middleware de autenticación
router.use(authMiddleware);

router.get("/table", authMiddleware, authorize('Listar Subalquileres'), getSubRentalsTable);
router.post("/", authMiddleware, authorize('Crear Subalquiler'), createSubRental);
router.get("/", authMiddleware, authorize('Listar Subalquileres'), getSubRentals);
router.get("/:id", authMiddleware, authorize('Ver Detalle de Subalquiler'), getSubRentalById);
router.put("/:id", authMiddleware, authorize('Editar Subalquiler'), updateSubRental);
router.delete("/:id", authMiddleware, authorize('Eliminar Subalquiler'), deleteSubRental);

export default router;