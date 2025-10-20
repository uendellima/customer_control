import { useState, useEffect } from "react";
import { applyPhoneMask } from "../utils/phoneMask";

interface Contact {
  id?: number;
  name: string;
  email: string;
  phone: string;
}

interface ContactFormProps {
  contact?: Contact;
  onSave: (data: { name: string; email: string; phone: string }) => void;
  onCancel: () => void;
}

export default function ContactForm({
  contact,
  onSave,
  onCancel,
}: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setEmail(contact.email);
      setPhone(applyPhoneMask(contact.phone));
    }
  }, [contact]);

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
    };

    // Validar nome
    if (!name.trim()) {
      newErrors.name = "Nome é obrigatório";
    } else if (name.trim().length < 3) {
      newErrors.name = "Nome deve ter no mínimo 3 caracteres";
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email inválido";
    }

    // Validar telefone
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    if (!phone.trim()) {
      newErrors.phone = "Telefone é obrigatório";
    } else if (phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Telefone deve ter no mínimo 10 dígitos";
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = "Telefone inválido";
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.phone;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    onSave({ name, email, phone });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Nome</label>
        <input
          className={`border rounded px-3 py-2 w-full ${
            errors.name ? "border-red-500" : ""
          }`}
          placeholder="Nome do contato"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors({ ...errors, name: "" });
          }}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          className={`border rounded px-3 py-2 w-full ${
            errors.email ? "border-red-500" : ""
          }`}
          placeholder="email@exemplo.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors({ ...errors, email: "" });
          }}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Telefone</label>
        <input
          type="tel"
          className={`border rounded px-3 py-2 w-full ${
            errors.phone ? "border-red-500" : ""
          }`}
          placeholder="(00) 00000-0000"
          value={phone}
          onChange={(e) => {
            const masked = applyPhoneMask(e.target.value);
            setPhone(masked);
            setErrors({ ...errors, phone: "" });
          }}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded flex-1 hover:bg-blue-700"
        >
          {contact ? "Atualizar" : "Adicionar"}
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded flex-1 hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
