"use client";
import { createOrder } from "@/actions";
import { Customer } from "@/lib/definitions";
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";

let client: S3Client | null = null;
if (
  process.env.NEXT_PUBLIC_AMAZON_ACCESS_SECRET &&
  process.env.NEXT_PUBLIC_AMAZON_ACCESS_KEY_ID
) {
  client = new S3Client({
    region: "eu-west-3",
    credentials: {
      secretAccessKey: process.env.NEXT_PUBLIC_AMAZON_ACCESS_SECRET,
      accessKeyId: process.env.NEXT_PUBLIC_AMAZON_ACCESS_KEY_ID,
    },
  });
}

interface CreateOrderProps {
  localFile: File;
  songName: string;
  contentType: string;
  customer: Customer;
  price: number;
  song_description: string;
}

export async function sendFile({
  localFile,
  songName,
  contentType,
  customer,
  price,
  song_description,
}: CreateOrderProps) {
  const bucketName = "skydersongs";
  const params: PutObjectCommandInput = {
    Bucket: bucketName,
    Key: customer.email + "_" + songName,
    Body: localFile,
    ContentType: contentType,
  };
  const command = new PutObjectCommand(params);
  // Define the S3 bucket name and Access Point ARN
  // Specify the folder within the S3 bucket

  try {
    if (client) {
      const data = await client.send(command);
      console.log("uploaded");
      await createOrder({
        location:
          "https://skydersongs.s3.eu-west-3.amazonaws.com/" +
          encodeURI(customer.email + "_" + songName),
        songName,
        customer: { email: customer.email, artist: customer.artist },
        price: price,
        song_description: song_description,
      });
    }
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialSignin";
    }
    throw error;
  }
}
