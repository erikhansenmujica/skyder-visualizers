"use server";
import { signIn } from "../auth";
import { CreateOrReturnExistingCustomer } from "./customers";
import { CreateNewOrder, UpdateOrderInvoiceID, getOrder } from "./orders";
import { CreateNewInvoice } from "./invoices";
import { createClient } from "@vercel/postgres";
import { Customer } from "@/lib/definitions";

export async function authenticate(
  _prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialSignin";
    }
    throw error;
  }
}
export const createInvoiceAndAddToOrder = async (
  email: string,
  artistName: string,
  stripe_pi_id: string
) => {
  const client = createClient();
  await client.connect();
  const custom = await CreateOrReturnExistingCustomer(
    {
      email,
      artist: artistName,
    },
    client
  );
  if (custom) {
    const order = await getOrder(custom.email, client);
    if (order) {
      const invoice = await CreateNewInvoice(
        {
          id: "",
          customer_id: custom.id ? custom.id : "",
          date: new Date().toISOString(),
          price: order.price,
          product_id:
            order?.price === 25 ? "Skyder Cover" : "Skyder Visualizer",
          stripe_pi_id: stripe_pi_id,
          status: "paid",
          order_id: order.id,
        },
        client
      );
      if (typeof invoice === "object") {
        await UpdateOrderInvoiceID(invoice.id, order.id, stripe_pi_id, client);
      }
    }
  }
};
interface SendOrderProps {
  songName: string;

  email: string;
  artistName: string;
  selectedOption: number;
  songDescription: string;
  contentType: string;
}
export async function SendOrder({
  songName,
  email,
  artistName,
  selectedOption,
  songDescription,
  contentType,
}: SendOrderProps) {
  const client = createClient();
  await client.connect();
  if (songName && email && artistName && selectedOption) {
    const order = await getOrder(email, client);
    const songtype =
      order && order.song_url.split(".")[order.song_url.split(".").length - 1];
    console.log(
      "Hay que updatear? ",
      !(
        order &&
        order.status === "pending" &&
        order.song_name === songName &&
        order.artist === artistName &&
        order.song_description === songDescription &&
        order.email === email &&
        order.price === selectedOption &&
        ((songtype === "mp3" && contentType === "audio/mpeg") ||
          (songtype === "wav" && contentType === "audio/wav"))
      )
    );
    if (
      order &&
      order.status === "pending" &&
      order.song_name === songName &&
      order.artist === artistName &&
      order.song_description === songDescription &&
      order.email === email &&
      order.price === selectedOption &&
      ((songtype === "mp3" && contentType === "audio/mpeg") ||
        (songtype === "wav" && contentType === "audio/wav"))
    ) {
      return 1;
    } else {
      return 0;
    }
    // await createOrder({
    //   localFile: songFile,
    //   songName,
    //   contentType,
    //   customer: {
    //     email,
    //     artist: artistName,
    //   },
    //   price: selectedOption,
    //   song_description: songDescription,
    // });
  }
}

export async function createOrder({
  location,
  songName,
  customer,
  price,
  song_description,
}: {
  location: string;
  songName: string;
  customer: Customer;
  price: number;
  song_description: string;
}) {
  const client = createClient();
  await client.connect();
  const custom = await CreateOrReturnExistingCustomer(customer, client);
  if (custom) {
    await CreateNewOrder(
      {
        id: "",
        artist: customer.artist,
        customer_id: custom.id ? custom.id : "",
        email: customer.email,
        song_description: song_description,
        song_url: location,
        song_name: songName,
        price: price,
        invoice_id: null,
        status: "pending",
      },
      client
    );
  }
}
