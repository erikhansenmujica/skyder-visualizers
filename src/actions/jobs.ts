"use server";
import { Job } from "@/lib/definitions";
import { createClient } from "@vercel/postgres";

export const GetJobs = async () => {
  const client = createClient();
  await client.connect();
  try {
    const jobs = await client.sql<Job>`SELECT * FROM jobs`;
    return jobs.rows;
  } catch (error) {
    console.error(error);
  }
};
