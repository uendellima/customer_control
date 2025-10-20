import prisma from "../prisma/PrismaClient.js";

export const createContact = async (req, res) => {
  const { nome, email, telefone, customerId } = req.body;
  if (!nome || !email || !telefone || !customerId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const CustomerExists = await prisma.Customer.findUnique({
      where: { id: Number(customerId) },
    });
    if (!CustomerExists) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const contact = await prisma.contato.create({
      data: { nome, email, telefone, customerId: Number(customerId) },
    });
    res.status(201).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failure to create contact" });
  }
};

export const listContacts = async (req, res) => {
  const { customerId } = req.params;
  try {
    const contacts = await prisma.contato.findMany({
      where: { customerId: Number(customerId) },
    });
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failure to list contacts" });
  }
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.contato.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({ error: "Contact not found" });
    }
    console.error(error);
    res.status(500).json({ error: "Failure to delete contact" });
  }
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone } = req.body;
  try {
    const contact = await prisma.contato.update({
      where: { id: Number(id) },
      data: { nome, email, telefone },
    });
    res.status(200).json(contact);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({ error: "Contact not found" });
    }
    console.error(error);
    res.status(500).json({ error: "Failure to update contact" });
  }
};

export const getContactById = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await prisma.contato.findUnique({
      where: { id: Number(id) },
    });
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ error: "Contact not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failure to get contact" });
  }
};
