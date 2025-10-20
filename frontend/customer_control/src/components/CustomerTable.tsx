import { applyPhoneMask } from "../utils/phoneMask";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface CustomerTableProps {
  customers: Customer[];
  onDelete: (id: number) => void;
  onViewContacts: (customer: { id: number; name: string }) => void;
}

export default function CustomerTable({
  customers,
  onDelete,
  onViewContacts,
}: CustomerTableProps) {
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 text-left">Nome</th>
          <th className="p-2 text-left">Email</th>
          <th className="p-2 text-left">Telefone</th>
          <th className="p-2 text-left">Data de Registro</th>
          <th className="p-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        {customers.length === 0 ? (
          <tr>
            <td colSpan={5} className="p-4 text-center text-gray-500">
              Nenhum cliente cadastrado
            </td>
          </tr>
        ) : (
          customers.map((customer) => (
            <tr key={customer.id} className="border-t">
              <td className="p-2">{customer.name}</td>
              <td className="p-2">{customer.email}</td>
              <td className="p-2">{applyPhoneMask(customer.phone)}</td>
              <td className="p-2">
                {new Date(customer.createdAt).toLocaleDateString()}
              </td>
              <td className="p-2 text-center">
                <button
                  onClick={() =>
                    onViewContacts({ id: customer.id, name: customer.name })
                  }
                  className="text-blue-600 hover:text-blue-800 mr-3 relative group"
                  title="Ver contatos"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Ver contatos
                  </span>
                </button>
                <button
                  onClick={() => onDelete(customer.id)}
                  className="text-red-600 hover:text-red-800 relative group"
                  title="Excluir cliente"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Excluir cliente
                  </span>
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
