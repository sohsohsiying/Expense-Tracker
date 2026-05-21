// db.ts — sets up the database client used throughout the app.
//
// This file creates a single shared instance of Prisma (our ORM —
// Object-Relational Mapper). An ORM lets you query a database using
// TypeScript instead of raw SQL.
//
// Usage anywhere in server code:
//   import { db } from "@/lib/db";
//   const expenses = await db.expense.findMany();

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// In development, Next.js hot-reloads your code on every save.
// Without this trick, each reload would create a NEW database connection,
// eventually exhausting the connection pool. Storing the client on `globalThis`
// makes it persist across hot-reloads so we always reuse the same connection.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

let prisma = globalForPrisma.prisma;

function createPrismaClient() {
  // PrismaPg connects to a PostgreSQL database.
  // DATABASE_URL is read from your environment — keep it secret, never commit it!
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required to connect to the database.");
  }

  const adapter = new PrismaPg({ connectionString: databaseUrl });
  return new PrismaClient({ adapter });
}

function getPrismaClient() {
  if (!prisma) {
    prisma = createPrismaClient();

    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = prisma;
    }
  }

  return prisma;
}

// Lazily create the client only when a route actually queries the database.
// This keeps `next build` from needing DATABASE_URL while importing API files.
export const db = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrismaClient();
    const value = client[prop as keyof PrismaClient];

    return typeof value === "function" ? value.bind(client) : value;
  },
});
