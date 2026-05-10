import dotenv from "dotenv";
dotenv.config();
console.log(process.env.DATABASE_URL);
console.log(typeof process.env.DATABASE_URL);

import express from "express";
import pool from "./config/database.js";

const app = express();

app.get("/", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows);
});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});