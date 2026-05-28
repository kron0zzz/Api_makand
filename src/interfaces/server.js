import express from "express";
import cors from "cors";

import supplierRoutes from "../infrastructure/routes/supplierRoutes.js";
import vehicleRoutes from "../infrastructure/routes/vehicleRoutes.js";
import customerRoutes from "../infrastructure/routes/CustomerRoutes.js";
import chargeTypeRoutes from "../infrastructure/routes/chargeTypeRoutes.js";
import projectRoutes from "../infrastructure/routes/projectRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API Makand funcionando"
  });
});

app.use("/api/suppliers", supplierRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/charge-types", chargeTypeRoutes);
app.use("/api/projects", projectRoutes);

export default app;
