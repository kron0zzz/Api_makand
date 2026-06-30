import dotenv from "dotenv";
dotenv.config();

import express from "express";
import "./config/database.js"; 
import app from "./interfaces/server.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor de Makand corriendo en puerto ${PORT}`);
});