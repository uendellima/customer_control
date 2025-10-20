// src/pages/Customers.tsx
import { useEffect, useState } from "react";
import { api } from "../api/axios";
import CustomerModal from "../components/CustomerModal";
import CustomerTable from "../components/CustomerTable";
import ContactsModal from "../components/ContactsModal";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactsModalOpen, setIsContactsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const loadCustomers = async () => {
    try {
      const { data } = await api.get("/customers");
      setCustomers(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCustomer = async (customerData: {
    name: string;
    email: string;
    phone: string;
  }) => {
    try {
      await api.post("/customers", customerData);
      loadCustomers();
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error);
    }
  };

  const handleDeleteCustomer = async (id: number) => {
    try {
      await api.delete(`/customers/${id}`);
      loadCustomers();
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    }
  };

  const handleViewContacts = (customer: { id: number; name: string }) => {
    setSelectedCustomer(customer);
    setIsContactsModalOpen(true);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Adicionar Cliente
        </button>
      </div>

      <CustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddCustomer}
      />

      <ContactsModal
        isOpen={isContactsModalOpen}
        customer={selectedCustomer}
        onClose={() => {
          setIsContactsModalOpen(false);
          setSelectedCustomer(null);
        }}
      />

      <CustomerTable
        customers={customers}
        onDelete={handleDeleteCustomer}
        onViewContacts={handleViewContacts}
      />
    </div>
  );
}
