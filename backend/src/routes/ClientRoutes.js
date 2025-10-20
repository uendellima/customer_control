import express from "express";
import { createClient, listClients } from "../controllers/ClientController.js";

const router = express.Router();

router.post("/clients", createClient);
router.get("/clients", listClients);

export default router;
