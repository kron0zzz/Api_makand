import express from "express";
<<<<<<< Updated upstream
import cors from "cors";
=======
import cors from "cors"; 
>>>>>>> Stashed changes

import supplierRoutes from "../infrastructure/routes/supplierRoutes.js";
import vehicleRoutes from "../infrastructure/routes/vehicleRoutes.js";
import customerRoutes from "../infrastructure/routes/CustomerRoutes.js";
import chargeTypeRoutes from "../infrastructure/routes/chargeTypeRoutes.js";
import projectRoutes from "../infrastructure/routes/projectRoutes.js";
import positionRoutes from "../infrastructure/routes/positionRoutes.js"
import machineryStatusRoutes from "../infrastructure/routes/machineryStatusRoutes.js";
import machineryCategoryRoutes from "../infrastructure/routes/machineryCategoryRoutes.js";
import machineryRoutes from "../infrastructure/routes/machineryRoutes.js";
import userRoutes from "../infrastructure/routes/userRoutes.js"
import authRoutes from "../infrastructure/routes/authRoutes.js"
import employeeRoutes from "../infrastructure/routes/employeeRoutes.js";
<<<<<<< Updated upstream
=======
import purchaseInvoiceRoutes from "../infrastructure/routes/purchaseInvoiceRoutes.js";


>>>>>>> Stashed changes
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API Makand funcionando"
  });
});

app.use("/api/suppliers", supplierRoutes);  //usar rutasapp.use("/api/customers", customerRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/charge-types", chargeTypeRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/positions", positionRoutes);
app.use("/api/machine-statuses", machineryStatusRoutes);
app.use("/api/machine-categories", machineryCategoryRoutes); 
app.use("/api/machines", machineryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/purchase-invoices", purchaseInvoiceRoutes);

export default app;





