import express from "express";
import purchaseRoutes from "../infrastucture/routes/purchaseRoutes.js";
import userRoutes from "../infrastucture/routes/userRoutes.js"
import customerRoutes from "../infrastucture/routes/customerRoutes.js"

const app = express();

app.use(express.json());

app.use("/api/", purchaseRoutes);
app.use("/api/", userRoutes);
app.use("/api/", customerRoutes);

export default app;