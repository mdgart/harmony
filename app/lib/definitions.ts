// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  is_active: boolean;
  user_type: string;
  token: string;
};

type Task = {
  id: number;
  name: string;
  description: string;
  due_date: string;
  created_by: number;
  attachments: null; // If attachments can have a specific type or structure, replace 'null' with that type
  icon: string;
  assignees: Assignee[];
};

type Assignee = {
  id: number;
  related_id: number;
  type: string;
  name: string;
};

export type Tasks = {
  code: number;
  message: string;
  data: Task[];
};

export type Address = {
  id: number;
  street: string;
  street_2: string;
  city: string;
  state: string;
  zip_code: string;
};

export type Destination = {
  id: number;
  name: string;
  description: string;
  address: Address;
};

export type Event = {
  id: number;
  external_id: number;
  name: string;
  start_date: string; // Assuming dates are in 'YYYY-MM-DD' format
  end_date: string; // Assuming dates are in 'YYYY-MM-DD' format
  status: string;
  type: string;
  notes: string;
  destination: Destination;
  group_ids: number[] | null; // Assuming this is an array of numbers or null
  tour_directors: number;
};

export type Events = {
  code: number;
  message: string;
  data: Event[];
};

// NextJS Tutotial Objects
export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
