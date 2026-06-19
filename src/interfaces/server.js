import express from "express";
import cors from "cors"; 

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
import orderRoutes from "../infrastructure/routes/orderRoutes.js"
import order_detailRoutes from "../infrastructure/routes/order_detailRoutes.js"
import purchaseInvoiceRoutes from "../infrastructure/routes/purchaseInvoiceRoutes.js";
import subRentalRoutes from "../infrastructure/routes/subRentalRoutes.js";
import projectRoutes from "../infrastructure/routes/projectRoutes.js"
import returnRoutes from "../infrastructure/routes/returnRoutes.js"
import paymentRoutes from "../infrastructure/routes/paymentRoutes.js"
import maintenanceRoutes from "../infrastructure/routes/maintenanceRoutes.js"
import orderStatusRoutes from "../infrastructure/routes/orderStatusRoutes.js"
import roleRoutes from "../infrastructure/routes/roleRoutes.js";

const app = express();

// Aumenta el límite de tamaño permitido para peticiones HTTP. 
// Es necesario para soportar el envío de imágenes de facturas convertidas a Base64 desde el formulario.
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors()); 
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
app.use("/api/orders", orderRoutes);
app.use("/api/order_details", order_detailRoutes);
app.use("/api/purchase-invoices", purchaseInvoiceRoutes);
app.use("/api/sub-rentals", subRentalRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/returns", returnRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/maintenances", maintenanceRoutes);
app.use("/api/order-status", orderStatusRoutes);
app.use("/api/roles", roleRoutes);

export default app;





