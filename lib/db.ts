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
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  // PrismaPg connects to a PostgreSQL database.
  // DATABASE_URL is read from your .env file — keep it secret, never commit it!
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  return new PrismaClient({ adapter });
}

// Reuse the existing client if one already exists (dev hot-reload safety),
// otherwise create a fresh one.
export const db = globalForPrisma.prisma ?? createPrismaClient();

// Only cache the client globally outside of production.
// In production each server process is long-lived, so no caching is needed.
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
