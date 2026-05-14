// import dotenv from "dotenv";
// import pkg from "pg";

// dotenv.config();

// const { Pool } = pkg;

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "MakandDB",
//   password: "123456",
//   port: 5432,
// });

// pool.connect()
//   .then(() => console.log("Conectado a PostgreSQL"))
//   .catch((err) => console.error("Error de conexión:", err));

// export default pool;









import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

// Ahora usamos process.env para mayor seguridad
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "makand_db",
  password: process.env.DB_PASSWORD || "1025",
  port: process.env.DB_PORT || 5432,
});

pool.connect()
  .then(() => console.log("Conectado a PostgreSQL - MakandDB"))
  .catch((err) => console.error("Error de conexión a la DB:", err));

export default pool;