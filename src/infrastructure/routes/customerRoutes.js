import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import authorize from "../../middlewares/authorize.js";
import { 
  createCustomer, 
  getCustomers, 
  getCustomerById, 
  updateCustomer, 
  deleteCustomer, 
  getCustomersTable 
} from "../controllers/customerController.js";

const router = Router();
  router.get("/table", authMiddleware, authorize('Listar Cliente'), getCustomersTable); 
  router.post("/", authMiddleware, authorize('Crear Cliente'), createCustomer);       
  router.get("/", authMiddleware, authorize('Listar Cliente'), getCustomers);          
  router.get("/:id", authMiddleware, authorize('Ver Detalle de Cliente'), getCustomerById);    
  router.put("/:id", authMiddleware, authorize('Editar Cliente'), updateCustomer);   
  router.delete("/:id", authMiddleware, authorize('Eliminar Cliente'), deleteCustomer);
export default router;