import express from "express";
import dotenv from "dotenv";
import customerRoutes from "./routes/CustomerRoutes.js";
import contactRoutes from "./routes/ContactRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(customerRoutes);
app.use(contactRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
