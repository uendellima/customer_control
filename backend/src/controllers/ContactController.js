import prisma from "../prisma/prismaClient.js";

export const createContact = async (req, res) => {
  const { nome, email, telefone, clienteId } = req.body;
  try {
    const contact = await prisma.contato.create({
      data: {
        nome,
        email,
        telefone,
        clienteId,
      },
    });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: "Failure to create contact" });
  }
};

export const listContacts = async (req, res) => {
  const { clienteId } = req.params;
  try {
    const contacts = await prisma.contato.findMany({
      where: { clienteId: Number(clienteId) },
    });
    res.status(200).json(contacts);
  } catch (error) {
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
    res.status(500).json({ error: "Failure to delete contact" });
  }
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone } = req.body;
  try {
    const contact = await prisma.contato.update({
      where: { id: Number(id) },
      data: {
        nome,
        email,
        telefone,
      },
    });
    res.status(200).json(contact);
  } catch (error) {
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
    res.status(500).json({ error: "Failure to get contact" });
  }
};
