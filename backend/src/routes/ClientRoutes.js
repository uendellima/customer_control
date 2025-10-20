import express from "express";
import {
  createClient,
  listClients,
  getClientById,
  updateClient,
  deleteClient,
} from "../controllers/ClientController.js";

const router = express.Router();

router.post("/clients", createClient);
router.get("/clients", listClients);
router.get("/clients/:id", getClientById);
router.put("/clients/:id", updateClient);
router.delete("/clients/:id", deleteClient);

export default router;
