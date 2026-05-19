import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

// Ahora usamos process.env para mayor seguridad
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect()
  .then(() => console.log("Conectado a PostgreSQL - MakandDB"))
  .catch((err) => console.error("Error de conexión a la DB:", err));

export default pool;
