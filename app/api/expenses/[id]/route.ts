// Handles PATCH (update an expense) and DELETE (delete an expense)
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

/* How are requests recieved and arguments passed into the API route handler
 --> req: NextRequest, { params }: { params: { id: string } }
 - req: NextRequest is the request object that contains information about the incoming HTTP request, such as headers, body, query parameters, etc.
 - { params }: { params: { id: string } } is an object destructuring syntax that extracts the params property from the second argument passed to the handler function. The params object contains route parameters defined in the file name (e.g., [id] in this case).
 - In this example, we expect a route parameter named id, which is a string. This id will be used to identify which expense record to update or delete in the database.
*/

// GET: Get a single expense by ID via findUnique
// findUnique is a function in Prisma that is used to retrieve a single record from your database by searching for a field that has a unique constraint (e.g., id, email). 
// It returns the record if found, or null if no matching record exists.
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const expense = await db.expense.findUnique({ where: { id } });
  if (!expense) return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
  return NextResponse.json(expense);
}

// PATCH: Update an expense
// update: Prisma Client method used to update a single record in the database. It requires a unique identifier (e.g., id) to find the record and an object with the fields to update.
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { title, amount, date } = await req.json();
  const expense = await db.expense.update({
    where: { id },
    data: { title, amount: parseFloat(amount), date: new Date(date) },
  });
  return NextResponse.json(expense);
}

// DELETE: Delete an expense
// delete: Prisma Client method used to delete a single record from the database. It requires a unique identifier (e.g., id) to find the record to delete.
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  await db.expense.delete({ where: { id } });
  return NextResponse.json({ message: 'Expense deleted' });
}
