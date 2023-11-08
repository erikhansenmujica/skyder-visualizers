"use server";
import { VercelClient, sql } from "@vercel/postgres";
import { Order } from "@/lib/definitions";

export const CreateNewOrder = async (order: Order, client: VercelClient) => {
  try {
    const newOrder =
      await client.sql<Order>`INSERT INTO orders (artist, customer_id, email, song_description, song_url, song_name, price, date, invoice_id, status, product_id) VALUES (${
        order.artist
      }, ${order.customer_id}, ${order.email}, ${order.song_description}, ${
        order.song_url
      }, ${order.song_name}, ${order.price}, ${order.date}, ${
        order.invoice_id
      }, ${order.status}, ${
        order.price === 25 ? "Skyder_Cover" : "Skyder_Visualizer"
      }) RETURNING *`;
    return newOrder.rows[0];
  } catch (error) {
    console.error(error);
  }
};
export const getOrder = async (email: string, client: VercelClient) => {
  try {
    const newOrder =
      await client.sql<Order>`SELECT * FROM orders WHERE email = ${email} ORDER BY  id DESC LIMIT 1`;
    return newOrder.rows[0];
  } catch (error) {
    console.error(error);
  }
};

export const UpdateOrderInvoiceID = async (
  invoiceId: string,
  order_id: string,
  stripe_pi_id: string,
  client: VercelClient
) => {
  try {
    const newOrder = await client.sql<Order>`
    UPDATE orders
    SET invoice_id = ${invoiceId}, stripe_pi_id = ${stripe_pi_id}
    WHERE id = ${order_id};
`;
    return newOrder.rows[0];
  } catch (error) {
    console.error(error);
  }
};
