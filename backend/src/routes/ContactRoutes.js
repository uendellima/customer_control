import express from "express";
import {
  createContact,
  listContacts,
  deleteContact,
  updateContact,
  getContactById,
} from "../controllers/ContactController.js";

const router = express.Router();

router.post("/contacts", createContact);
router.get("/contacts/:clientId", listContacts);
router.delete("/contacts/:id", deleteContact);
router.put("/contacts/:id", updateContact);
router.get("/contacts/:id", getContactById);

export default router;
