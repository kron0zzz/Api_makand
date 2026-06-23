import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import authorize from "../../middlewares/authorize.js";
import { 
  createEmployee, 
  getEmployees, 
  getEmployeeById, 
  updateEmployee, 
  deleteEmployee, 
  getEmployeesTable 
} from "../controllers/employeeController.js";

const router = Router();
router.post("/", authMiddleware, authorize('Crear Empleado'), createEmployee);
router.get("/", authMiddleware, authorize('Listar Empleados'), getEmployees);
router.get("/table", authMiddleware, authorize('Listar Empleados'), getEmployeesTable);
router.get("/:id", authMiddleware, authorize('Ver Detalle Empleado'), getEmployeeById);
router.put("/:id", authMiddleware, authorize('Editar Empleado'), updateEmployee);
router.delete("/:id", authMiddleware, authorize('Eliminar Empleado'), deleteEmployee);

export default router;