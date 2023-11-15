"use server";
import { db } from "@vercel/postgres";
import { Invoice } from "@/lib/definitions";

export const CreateNewInvoice = async (invoice: Invoice) => {
  const client = await db.connect();

  try {
    const invc = await getInvoice(invoice.order_id);
    if (!invc) {
      const newInvoice = await client.sql<Invoice>`
      INSERT INTO invoices (customer_id, date, price, product_id, stripe_pi_id, status, order_id)
      VALUES (${invoice.customer_id},${invoice.date},${invoice.price},${invoice.product_id},${invoice.stripe_pi_id},${invoice.status},${invoice.order_id})
      RETURNING *
      `;
      return newInvoice.rows[0];
    } else {
      return "already exists";
    }
  } catch (error) {
    console.error(error);
  }
};
export const getInvoice = async (order: string) => {
  const client = await db.connect();
  try {
    const invoice =
      await client.sql<Invoice>`SELECT * FROM invoices WHERE order_id = ${order} ORDER BY id DESC LIMIT 1`;
    return invoice.rows[0];
  } catch (error) {
    console.error(error);
  }
};

export const GetAllInvoices = async () => {
  const client = await db.connect();
  try {
    const invoices = await client.sql<Invoice>`SELECT * FROM invoices`;

    return invoices.rows;
  } catch (error) {
    console.error(error);
  }
};
export const GetUserInvoices = async (id: string) => {
  const client = await db.connect();
  try {
    const invoices =
      await client.sql<Invoice>`SELECT * FROM invoices WHERE customer_id = ${id}`;

    return invoices.rows;
  } catch (error) {
    console.error(error);
  }
};
