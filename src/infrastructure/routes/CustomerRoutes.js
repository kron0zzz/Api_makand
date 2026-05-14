// import { Router } from "express";
// import { createCustomer, getCustomers, getCustomerById, updateCustomer, deleteCustomer, getCustomersTable } from "../controllers/customerController.js";

// const router = Router();

// router.post("/", createCustomer);       
// router.get("/", getCustomers);        
// router.get("/table", getCustomersTable);  
// router.get("/:id", getCustomerById);   
// router.put("/:id", updateCustomer);  
// router.delete("/:id", deleteCustomer);

// export default router;













import { Router } from "express";
import { 
  createCustomer, 
  getCustomers, 
  getCustomerById, 
  updateCustomer, 
  deleteCustomer, 
  getCustomersTable 
} from "../controllers/customerController.js";

const router = Router();

// 1. LAS RUTAS ESTÁTICAS PRIMERO
router.get("/table", getCustomersTable); 

// 2. RUTAS DE COLECCIÓN
router.post("/", createCustomer);       
router.get("/", getCustomers);          

// 3. RUTAS DINÁMICAS (CON PARÁMETROS) AL FINAL
router.get("/:id", getCustomerById);    
router.put("/:id", updateCustomer);   
router.delete("/:id", deleteCustomer);

export default router;