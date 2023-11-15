"use server";
import { Job } from "@/lib/definitions";
import { db } from "@vercel/postgres";

export const GetJobs = async () => {
  const client = await db.connect();
  try {
    const jobs = await client.sql<Job>`SELECT * FROM jobs`;
    return jobs.rows;
  } catch (error) {
    console.error(error);
  }
};
