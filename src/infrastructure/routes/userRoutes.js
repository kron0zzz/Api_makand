import { Router } from "express";
import { createUser, getUsers, getUserById, updateUser, deleteUser, getUsersTable} from "../controllers/userController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import authorize from "../../middlewares/authorize.js";
const router = Router();

router.post("/", authMiddleware, authorize('Crear Usuario'), createUser);
router.get("/", authMiddleware, authorize('Listar Usuarios'), getUsers);
router.get("/table", authMiddleware, authorize('Listar Usuarios'), getUsersTable);
router.get("/:id", authMiddleware, authorize('Ver Detalle de Usuario'), getUserById);
router.put("/:id", authMiddleware, authorize('Editar Usuario'), updateUser);
router.delete("/:id", authMiddleware, authorize('Eliminar Usuario'), deleteUser);


export default router;
