import { useEffect, useState } from "react";
import { api } from "../api/axios";
import ContactForm from "./ContactForm";
import { applyPhoneMask } from "../utils/phoneMask";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface Customer {
  id: number;
  name: string;
}

interface ContactsModalProps {
  isOpen: boolean;
  customer: Customer | null;
  onClose: () => void;
}

export default function ContactsModal({
  isOpen,
  customer,
  onClose,
}: ContactsModalProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && customer) {
      loadContacts();
    }
  }, [isOpen, customer]);

  const loadContacts = async () => {
    if (!customer) return;

    setLoading(true);
    try {
      const { data } = await api.get(`/contacts/${customer.id}`);
      setContacts(data);
    } catch (error) {
      console.error("Erro ao carregar contatos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = async (contactData: {
    name: string;
    email: string;
    phone: string;
  }) => {
    if (!customer) return;

    try {
      await api.post("/contacts", {
        ...contactData,
        customerId: customer.id,
      });
      setShowForm(false);
      loadContacts();
    } catch (error) {
      console.error("Erro ao adicionar contato:", error);
    }
  };

  const handleUpdateContact = async (contactData: {
    name: string;
    email: string;
    phone: string;
  }) => {
    if (!editingContact) return;

    try {
      await api.put(`/contacts/${editingContact.id}`, contactData);
      setEditingContact(null);
      setShowForm(false);
      loadContacts();
    } catch (error) {
      console.error("Erro ao atualizar contato:", error);
    }
  };

  const handleDeleteContact = async (id: number) => {
    if (!window.confirm("Deseja realmente excluir este contato?")) return;

    try {
      await api.delete(`/contacts/${id}`);
      loadContacts();
    } catch (error) {
      console.error("Erro ao excluir contato:", error);
    }
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingContact(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Contatos de {customer?.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded mb-4 hover:bg-green-700"
          >
            Adicionar Contato
          </button>
        )}

        {showForm && (
          <div className="mb-6 p-4 bg-gray-50 rounded">
            <h3 className="font-semibold mb-3">
              {editingContact ? "Editar Contato" : "Novo Contato"}
            </h3>
            <ContactForm
              contact={editingContact || undefined}
              onSave={editingContact ? handleUpdateContact : handleAddContact}
              onCancel={handleCancelForm}
            />
          </div>
        )}

        {loading ? (
          <div className="text-center py-8 text-gray-500">
            Carregando contatos...
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nenhum contato cadastrado
          </div>
        ) : (
          <div className="space-y-3">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="border rounded p-4 hover:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{contact.name}</h3>
                    <p className="text-gray-600">
                      <span className="font-medium">Email:</span>{" "}
                      {contact.email}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Telefone:</span>{" "}
                      {applyPhoneMask(contact.phone)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(contact)}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteContact(contact.id)}
                      className="text-red-600 hover:underline"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded w-full hover:bg-gray-400"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
