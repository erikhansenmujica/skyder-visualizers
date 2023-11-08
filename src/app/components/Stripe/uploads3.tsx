import { createOrder } from "@/actions";
import { Customer } from "@/lib/definitions";
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";

const client = new S3Client({
  region: "eu-west-3",
  credentials: {
    secretAccessKey: process.env.NEXT_PUBLIC_AMAZON_SECRET_ACCESS_KEY
      ? process.env.NEXT_PUBLIC_AMAZON_SECRET_ACCESS_KEY
      : "",
    accessKeyId: process.env.NEXT_PUBLIC_AMAZON_ACCESS_KEY_ID
      ? process.env.NEXT_PUBLIC_AMAZON_ACCESS_KEY_ID
      : "",
  },
});

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
    client.send(command, async (err: any, data: any) => {
      console.log("AWS: ", songName);
      if (err) {
        console.error(err);
      } else {
        console.log("uploaded");
        await createOrder({
          data,
          songName,
          customer: { email: customer.email, artist: customer.artist },
          price: price,
          song_description: song_description,
        });
      }
    });
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialSignin";
    }
    throw error;
  }
}
