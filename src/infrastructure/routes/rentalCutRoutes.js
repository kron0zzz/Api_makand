import { Router } from "express";
import {createRentalCut, getRentalCuts, getRentalCutById, updateRentalCut, deleteRentalCut, getRentalCutsTable,  getRentalCutByOrderId } from "../controllers/rentalCutController.js";

import authMiddleware from "../../middlewares/authMiddleware.js";
import authorize from "../../middlewares/authorize.js";

const router = Router();

router.use(authMiddleware);

router.post("/", authorize('Crear Corte de Alquiler'), createRentalCut);
router.get("/", authorize('Listar Cortes de Alquiler'), getRentalCuts);
router.get("/table", authorize('Listar Cortes de Alquiler en Tabla'), getRentalCutsTable);
router.get("/:id", authorize('Ver Detalle de Corte'), getRentalCutById);
router.get("/order/:id", authorize('Listar Cortes por Orden'), getRentalCutByOrderId);
router.put("/:id", authorize('Editar Corte de Alquiler'), updateRentalCut);
router.delete("/:id", authorize('Eliminar Corte de Alquiler'), deleteRentalCut);

export default router;