import express from "express";
import {
  createContact,
  listContacts,
} from "../controllers/ContactController.js";

const router = express.Router();

router.post("/contacts", createContact);
router.get("/contacts/:clientId", listContacts);

export default router;
