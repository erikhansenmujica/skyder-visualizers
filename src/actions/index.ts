"use server";
import { Customer } from "@/lib/definitions";
import { signIn } from "../auth";
import { CreateOrReturnExistingCustomer } from "./customers";
import { CreateNewOrder, UpdateOrderInvoiceID, getOrder } from "./orders";
import { CreateNewInvoice } from "./invoices";
import { createClient } from "@vercel/postgres";
const AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
  secretAccessKey: process.env.AMAZON_ACCESS_SECRET,
  region: "eu-west-3",
});
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "200mb",
    },
  },
};
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

interface CreateOrderProps {
  localFile: string;
  songName: string;
  contentType: string;
  customer: Customer;
  price: number;
  song_description: string;
}

export async function createOrder({
  localFile,
  songName,
  contentType,
  customer,
  price,
  song_description,
}: CreateOrderProps) {
  try {
    const s3 = new AWS.S3();
    // Define the S3 bucket name and Access Point ARN
    const bucketName = "skydersongs";
    // Specify the folder within the S3 bucket
    const base64Data = localFile.split(",")[1];
    // Specify the local file you want to upload
    const binaryData = Buffer.from(base64Data, "base64");
    // Create the S3 object key by combining the folder and file name

    s3.upload(
      {
        Bucket: bucketName,
        Key: customer.email + "_" + songName,
        Body: binaryData,
        ContentType: contentType,
      },
      async (err: any, data: any) => {
        const client = createClient();
        await client.connect();
        if (err) {
          console.error("Error uploading file:", err);
        } else {
          const custom = await CreateOrReturnExistingCustomer(customer, client);
          if (custom) {
            await CreateNewOrder(
              {
                id: "",
                artist: customer.artist,
                customer_id: custom.id ? custom.id : "",
                email: customer.email,
                song_description: song_description,
                song_url: data.Location,
                song_name: songName,
                price: price,
                date: new Date().toISOString(),
                invoice_id: null,
                status: "pending",
              },
              client
            );
          }
        }
      }
    );
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialSignin";
    }
    throw error;
  }
}
interface SendOrderProps {
  songName: string;
  songFile: string;
  email: string;
  artistName: string;
  selectedOption: number;
  songDescription: string;
  contentType: string;
}
export async function SendOrder({
  songName,
  songFile,
  email,
  artistName,
  selectedOption,
  songDescription,
  contentType,
}: SendOrderProps) {
  const client = createClient();
  await client.connect();
  if (songName && songFile && email && artistName && selectedOption) {
    const order = await getOrder(email, client);
    const songtype =
      order && order.song_url.split(".")[order.song_url.split(".").length - 1];

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
      return "already exists";
    } else
      await createOrder({
        localFile: songFile,
        songName,
        contentType,
        customer: {
          email,
          artist: artistName,
        },
        price: selectedOption,
        song_description: songDescription,
      });
  }
}
