import dotenv from "dotenv";
dotenv.config();
import express from "express";
import "./config/database.js";
import router from "./infrastructure/routes/supplierRoutes.js";

const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    message: "API Makand funcionando"
  });
});

app.use("/suppliers", router);

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});