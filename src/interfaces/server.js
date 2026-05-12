import express from "express";

import supplierRoutes from "../infrastructure/routes/supplierRoutes.js";    //agregar rutas
import vehicleRoutes from "../infrastructure/routes/vehicleRoutes.js";
import customerRoutes from "../infrastructure/routes/CustomerRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API Makand funcionando"
  });
});

app.use("/api/suppliers", supplierRoutes);      //usar rutas
app.use("/api/customers", customerRoutes);
app.use("/api/vehicles", vehicleRoutes);

export default app;