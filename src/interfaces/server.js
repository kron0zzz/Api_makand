import express from "express";
import cors from "cors"; 

import chargeTypeRoutes from "../infrastructure/routes/chargeTypeRoutes.js";
import supplierRoutes from "../infrastructure/routes/supplierRoutes.js"; 
import vehicleRoutes from "../infrastructure/routes/vehicleRoutes.js";
import customerRoutes from "../infrastructure/routes/customerRoutes.js";
import positionRoutes from "../infrastructure/routes/positionRoutes.js";
import machineryStatusRoutes from "../infrastructure/routes/machineryStatusRoutes.js";
import machineryCategoryRoutes from "../infrastructure/routes/machineryCategoryRoutes.js";
import machineryRoutes from "../infrastructure/routes/machineryRoutes.js";
import machinery_stockRoutes from "../infrastructure/routes/machinery_stockRoutes.js"
import userRoutes from "../infrastructure/routes/userRoutes.js";
import authRoutes from "../infrastructure/routes/authRoutes.js";
import employeeRoutes from "../infrastructure/routes/employeeRoutes.js";
import orderRoutes from "../infrastructure/routes/orderRoutes.js";
import order_detailRoutes from "../infrastructure/routes/order_detailRoutes.js";
import purchaseInvoiceRoutes from "../infrastructure/routes/purchaseInvoiceRoutes.js";
import purchaseInvoiceDetailRoutes from "../infrastructure/routes/purchaseInvoiceDetailRoutes.js";
import subRentalRoutes from "../infrastructure/routes/subRentalRoutes.js";
import projectRoutes from "../infrastructure/routes/projectRoutes.js";
import returnRoutes from "../infrastructure/routes/returnRoutes.js";
import paymentRoutes from "../infrastructure/routes/paymentRoutes.js";
import maintenanceRoutes from "../infrastructure/routes/maintenanceRoutes.js";
import orderStatusRoutes from "../infrastructure/routes/orderStatusRoutes.js";
import roleRoutes from "../infrastructure/routes/roleRoutes.js";
import rentalCutRoutes from "../infrastructure/routes/rentalCutRoutes.js";
import dashboardRoutes from "../infrastructure/routes/dashboardRoutes.js";
import additionalChargeRoutes from "../infrastructure/routes/additionalChargeRoutes.js";
console.log("¡Leyendo server.js!");

const app = express();

// Configuración de límites
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors()); 
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API Makand funcionando (Unificada)"
  });
});

// Registro de rutas
app.use("/api/suppliers", supplierRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/positions", positionRoutes);
app.use("/api/machine-statuses", machineryStatusRoutes);
app.use("/api/machine-categories", machineryCategoryRoutes); 
app.use("/api/machines", machineryRoutes);
app.use("/api/stock", machinery_stockRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/order_details", order_detailRoutes);
app.use("/api/purchase-invoices", purchaseInvoiceRoutes);
app.use("/api/purchase-invoice-details", purchaseInvoiceDetailRoutes);
app.use("/api/sub-rentals", subRentalRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/returns", returnRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/maintenances", maintenanceRoutes);
app.use("/api/order-status", orderStatusRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/charge-types", chargeTypeRoutes);
app.use("/api/rental-cuts", rentalCutRoutes);
app.use("/api/additional-charges", additionalChargeRoutes);
app.use("/api/dashboard", dashboardRoutes);

export default app;
