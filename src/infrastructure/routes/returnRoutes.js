// import { Router } from "express";
// import authMiddleware from "../../middlewares/authMiddleware.js";
// import authorize from "../../middlewares/authorize.js";
// import {
//   createReturn,
//   getReturns,
//   getReturnById,
//   updateReturn,
//   deleteReturn,
//   getReturnsTable
// } from "../controllers/returnController.js";


// const router = Router();

// router.use(authMiddleware);

// router.post("/", authMiddleware, authorize('Crear Devolución'), createReturn);
// router.get("/", authMiddleware, authorize('Listar Devolucion'), getReturns);
// router.get("/table", authMiddleware, authorize('Listar Devolucion'), getReturnsTable);
// router.get("/:id", authMiddleware, authorize('Ver Detalle de Devolución'), getReturnById);
// router.put("/:id", authMiddleware, authorize('Editar Devolución'), updateReturn);
// router.delete("/:id", authMiddleware, authorize('Eliminar Devolución'), deleteReturn);

// export default router;

import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import authorize from "../../middlewares/authorize.js";
import { createReturn, getReturns, getReturnById, updateReturn, deleteReturn, getReturnsTable } from "../controllers/returnController.js";

const router = Router();

router.use(authMiddleware);

router.post("/", authorize('Crear Devolución'), createReturn);
router.get("/", authorize('Listar Devolucion'), getReturns);
router.get("/table", authorize('Listar Devolucion en Tabla'), getReturnsTable);
router.get("/:id", authorize('Ver Detalle de Devolución'), getReturnById);
router.put("/:id", authorize('Editar Devolución'), updateReturn);
router.delete("/:id", authorize('Eliminar Devolución'), deleteReturn);

export default router;