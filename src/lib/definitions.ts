// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id?: string;
  artist: string;
  email: string;
  image_url?: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
};

export type Invoice = {
  id: string;
  customer_id: string;
  price: number;
  date: string;
  product_id: string;
  stripe_pi_id: string;
  status: "pending" | "paid" | "failed";
  order_id: string;
};

export type Order = {
  id: string;
  email: string;
  song_url: string;
  song_name: string;
  artist: string;
  price: number;
  date: string;
  invoice_id: string | null;
  customer_id: string;
  song_description: string;
  status: "pending" | "completed";
};

export type Job = {
  id: string;
  link: string;
  song_name: string;
  time_spent: string;
  artist: string;
  product_id: string;
  customer_id: string;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  product_id: string;
  stripe_pi_id: string;
  status: "pending" | "paid" | "failed";
};

export type CustomersTable = {
  id: string;
  artist: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: "pending" | "paid" | "failed";
};
