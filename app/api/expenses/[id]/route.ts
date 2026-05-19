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

  // SERVER-SIDE VALIDATION
  // Check if title is provided and not empty/whitespace
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return NextResponse.json(
      { error: 'Title is required and cannot be empty' },
      { status: 400 }
    );
  }

  // Check if title is reasonable length (max 100 chars)
  if (title.length > 100) {
    return NextResponse.json(
      { error: 'Title must be 100 characters or less' },
      { status: 400 }
    );
  }

  // Check if amount is a valid number and positive
  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return NextResponse.json(
      { error: 'Amount must be a positive number' },
      { status: 400 }
    );
  }

  // Check if date is valid
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return NextResponse.json(
      { error: 'Date must be a valid date' },
      { status: 400 }
    );
  }

  const expense = await db.expense.update({
    where: { id },
    data: { title: title.trim(), amount: parsedAmount, date: parsedDate },
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
