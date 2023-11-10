const { db } = require("@vercel/postgres");
const {
  invoices,
  customers,
  revenue,
  users,
  jobs,
} = require("../src/lib/placeholder-data.ts");
const bcrypt = require("bcrypt");

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedInvoices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID NOT NULL,
    status VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    date TIMESTAMP DEFAULT NOW(),
    product_id VARCHAR(255) NOT NULL,
    stripe_pi_id VARCHAR(255),
    order_id UUID
  );
`;

    console.log(`Created "invoices" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error("Error seeding invoices:", error);
    throw error;
  }
}
async function seedOrders(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "orders" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID NOT NULL,
    status VARCHAR(255) NOT NULL,
    date TIMESTAMP DEFAULT NOW(),
    product_id VARCHAR(255) NOT NULL,
    stripe_pi_id VARCHAR(8000),
    email VARCHAR(255) NOT NULL,
    song_url VARCHAR(8000) NOT NULL,
    song_name VARCHAR(255) NOT NULL,
    artist VARCHAR(8000) NOT NULL,
    price INT NOT NULL,
    invoice_id UUID,
    song_description VARCHAR(8000) NOT NULL
  );
`;

    console.log(`Created "orders" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error("Error seeding orders:", error);
    throw error;
  }
}

async function seedJobs(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS jobs (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
        link VARCHAR(255),
        song_name VARCHAR(255),
        time_spent VARCHAR(255),
        artist VARCHAR(255),
        product_id VARCHAR(255),
        customer_id UUID,
        date TIMESTAMP DEFAULT NOW()
      );
    `;
    console.log(`Created "jobs" table`);
    const insertedJobs = await Promise.all(
      jobs.map(
        (job) => client.sql`
        INSERT INTO jobs (link, song_name, time_spent, artist, product_id, customer_id)
        VALUES (${job.link}, ${job.song_name}, ${job.time_spent}, ${job.artist}, ${job.product_id}, ${job.customer_id})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );
    return {
      createTable,
      jobs: insertedJobs,
    };
  } catch (error) {
    console.error("Error seeding jobs:", error);
  }
}

async function seedCustomers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        artist VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        image_url VARCHAR(255),
        date TIMESTAMP DEFAULT NOW()
      );
    `;

    console.log(`Created "customers" table`);

    // Insert data into the "customers" table
    const insertedCustomers = await Promise.all(
      customers.map(
        (customer) => client.sql`
        INSERT INTO customers (id, artist, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    // console.log(`Seeded ${insertedCustomers.length} customers`);

    return {
      createTable,
      customers: insertedCustomers,
    };
  } catch (error) {
    console.error("Error seeding customers:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  client.sql`DROP table IF EXISTS users CASCADE`;
  // client.sql`DROP table IF EXISTS customers CASCADE`;
  // client.sql`DROP table IF EXISTS invoices CASCADE`;
  // client.sql`DROP table IF EXISTS orders CASCADE`;
  // client.sql`DROP table IF EXISTS invoice CASCADE`;
  // client.sql`DROP table IF EXISTS jobs CASCADE`;
  await seedUsers(client);
  // await seedCustomers(client);
  // await seedOrders(client);
  // await seedInvoices(client);
  // await seedJobs(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
