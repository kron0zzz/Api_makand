import { Router } from "express";
import { createCustomer, getCustomers, getCustomerById, updateCustomer, deleteCustomer, getCustomersTable } from "../controllers/customerController.js";

const router = Router();

router.post("/", createCustomer);       
router.get("/", getCustomers);        
router.get("/table", getCustomersTable);  
router.get("/:id", getCustomerById);   
router.put("/:id", updateCustomer);  
router.delete("/:id", deleteCustomer);

export default router;