import express from "express";

import supplierRoutes from "../infrastructure/routes/supplierRoutes.js";
import vehicleRoutes from "../infrastructure/routes/vehicleRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API Makand funcionando"
  });
});

app.use("/api/suppliers", supplierRoutes);
app.use("/api/vehicles", vehicleRoutes);

export default app;