import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import customerRoutes from "./routes/CustomerRoutes.js";
import contactRoutes from "./routes/ContactRoutes.js";
import { swaggerUi, swaggerSpec } from "./swagger.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

// Rota para documentação da API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(customerRoutes);
app.use(contactRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    `API Documentation available at http://localhost:${PORT}/api-docs`
  );
});
