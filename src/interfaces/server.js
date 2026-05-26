import express from "express";
import cors from "cors"; // 1. IMPORTA CORS

import supplierRoutes from "../infrastructure/routes/supplierRoutes.js";    //agregar rutas
import vehicleRoutes from "../infrastructure/routes/vehicleRoutes.js";
import customerRoutes from "../infrastructure/routes/customerRoutes.js";
import positionRoutes from "../infrastructure/routes/positionRoutes.js"
import machineryStatusRoutes from "../infrastructure/routes/machineryStatusRoutes.js";
import machineryCategoryRoutes from "../infrastructure/routes/machineryCategoryRoutes.js";
import machineryRoutes from "../infrastructure/routes/machineryRoutes.js";
import userRoutes from "../infrastructure/routes/userRoutes.js"
import authRoutes from "../infrastructure/routes/authRoutes.js"
import employeeRoutes from "../infrastructure/routes/employeeRoutes.js";

const app = express();
app.use(cors()); //2. ACTIVA CORS antes de las rutas
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API Makand funcionando"
  });
});

app.use("/api/suppliers", supplierRoutes);  //usar rutas
app.use("/api/customers", customerRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/positions", positionRoutes);
app.use("/api/machine-statuses", machineryStatusRoutes);
app.use("/api/machine-categories", machineryCategoryRoutes); 
app.use("/api/machines", machineryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
export default app;





