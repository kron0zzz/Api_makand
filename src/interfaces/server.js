import express from "express";

import supplierRoutes from "../infrastructure/routes/supplierRoutes.js";    //agregar rutas

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API Makand funcionando"
  });
});

app.use("/api/suppliers", supplierRoutes);      //usar rutas

export default app;