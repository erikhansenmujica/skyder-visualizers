"use server";
import { VercelClient, sql } from "@vercel/postgres";
import { Customer } from "@/lib/definitions";

export const CreateOrReturnExistingCustomer = async (
  customer: Customer,
  client: VercelClient
): Promise<Customer | undefined> => {
  try {
    const existingCustomer =
      await client.sql<Customer>`SELECT * FROM customers WHERE email = ${customer.email}`;

    if (existingCustomer.rowCount === 0) {
      const newCustomer =
        await client.sql<Customer>`INSERT INTO customers (email, artist) VALUES (${customer.email}, ${customer.artist}) RETURNING *`;

      return newCustomer.rows[0];
    } else {
      return existingCustomer.rows[0];
    }
  } catch (error) {
    console.error(error);
  }
};

export const GetCustomerById = async (id: string, client: VercelClient) => {
  try {
    const customer =
      await client.sql<Customer>`SELECT * FROM customers WHERE id = ${id}`;
    return customer.rows[0];
  } catch (error) {
    console.error(error);
  }
};
