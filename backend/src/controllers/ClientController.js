import prisma from "../prisma/prismaClient.js";

export const createClient = async (req, res) => {
  const { nome } = req.body;
  try {
    const client = await prisma.cliente.create({
      data: {
        nome,
      },
    });
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ error: "Failure to create client" });
  }
};

export const listClients = async (req, res) => {
  try {
    const clients = await prisma.cliente.findMany({
      include: { contatos: true },
    });
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: "Failure to list clients" });
  }
};

export const getClientById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await prisma.cliente.findUnique({
      where: { id: Number(id) },
      include: { contatos: true },
    });
    if (client) {
      res.status(200).json(client);
    } else {
      res.status(404).json({ error: "Client not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failure to get client" });
  }
};

export const updateClient = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  try {
    const client = await prisma.cliente.update({
      where: { id: Number(id) },
      data: {
        nome,
      },
    });
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ error: "Failure to update client" });
  }
};

export const deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.cliente.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failure to delete client" });
  }
};
