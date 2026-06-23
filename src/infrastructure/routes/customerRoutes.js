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
  router.get("/table", authMiddleware, authorize('Listar Clientes'), getCustomersTable); 
  router.post("/", authMiddleware, authorize('Crear Cliente'), createCustomer);       
  router.get("/", authMiddleware, authorize('Listar Clientes'), getCustomers);          
  router.get("/:id", authMiddleware, authorize('Ver Detalle Cliente'), getCustomerById);    
  router.put("/:id", authMiddleware, authorize('Editar Cliente'), updateCustomer);   
  router.delete("/:id", authMiddleware, authorize('Eliminar Cliente'), deleteCustomer);
export default router;