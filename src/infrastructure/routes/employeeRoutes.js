import { Router } from "express";
import { 
  createEmployee, 
  getEmployees, 
  getEmployeeById, 
  updateEmployee, 
  deleteEmployee, 
  getEmployeesTable 
} from "../controllers/employeeController.js";

const router = Router();

router.post("/", createEmployee);
router.get("/", getEmployees);
router.get("/table", getEmployeesTable);
router.get("/:id", getEmployeeById);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;