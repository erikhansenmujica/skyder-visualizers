"use client";
import { createOrder } from "@/actions";
import { Customer } from "@/lib/definitions";
import { S3Client, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { Dispatch, SetStateAction } from "react";
import { Upload } from "@aws-sdk/lib-storage";

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
  setPercentage: Dispatch<SetStateAction<number>>;
}

export async function sendFile({
  localFile,
  songName,
  contentType,
  customer,
  price,
  song_description,
  setPercentage,
}: CreateOrderProps) {
  const bucketName = "skydersongs";
  const params: PutObjectCommandInput = {
    Bucket: bucketName,
    Key: customer.email + "_" + songName,
    Body: localFile,
    ContentType: contentType,
  };
  try {
    if (client) {
      const upload = new Upload({
        client,
        params,
      });
      upload.on("httpUploadProgress", (progress) => {
        if (progress.loaded && progress.total)
          setPercentage(Math.round((progress.loaded * 100) / progress.total));
      });
      await upload.done();
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
