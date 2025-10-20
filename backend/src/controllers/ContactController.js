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
