export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  customerId: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
}
