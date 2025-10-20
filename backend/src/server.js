import express from "express";
import dotenv from "dotenv";
import clientRoutes from "./routes/ClientRoutes.js";
import contactRoutes from "./routes/ContactRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(clientRoutes);
app.use(contactRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
