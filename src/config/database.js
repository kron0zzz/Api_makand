import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "makand_db",
  password: "Mrpostgres",
  port: 5432,
});

pool.connect()
  .then(() => console.log("Conectado a PostgreSQL"))
  .catch((err) => console.error("Error de conexión:", err));

export default pool;