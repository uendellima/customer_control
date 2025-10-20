import prisma from "../prisma/PrismaClient.js";

export const createCustomer = async (req, res) => {
  const { name } = req.body;
  try {
    const customer = await prisma.customer.create({
      data: {
        name,
      },
    });
    res.status(201).json(customer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failure to create customer" });
  }
};

export const listCustomers = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany({
      include: { contacts: true },
    });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: "Failure to list customers" });
  }
};

export const getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: Number(id) },
      include: { contacts: true },
    });
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ error: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failure to get customer" });
  }
};

export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  try {
    const customer = await prisma.customer.update({
      where: { id: Number(id) },
      data: {
        nome,
      },
    });
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: "Failure to update customer" });
  }
};

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.contact.deleteMany({
      where: { customerId: Number(id) },
    });
    await prisma.customer.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failure to delete customer" });
  }
};
