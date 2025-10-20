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
