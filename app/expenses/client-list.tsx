// ExpensesClientList.tsx — client-side component for CRUD UI
// Fetches, displays, adds, and deletes expenses using the API
"use client";
import { useEffect, useState } from "react";
import ExpenseCard from "@/components/ExpenseCard";
import ExpenseForm from "@/components/ExpenseForm";

type Expense = {
  id: string;
  title: string;
  amount: number;
  date: string;
  createdAt: string;
};

export default function ExpensesClientList() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch expenses from API
  useEffect(() => {
    fetch("/api/expenses")
      .then((res) => res.json())
      .then((data) => {
        setExpenses(data);
        setLoading(false);
      });
  }, []);

  // Add expense handler
  async function handleAddExpense(expense: { title: string; amount: number; date: string }) {
    try {
      setError(null);
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "Failed to add expense");
        return;
      }
      
      setExpenses([data, ...expenses]);
    } catch (err) {
      setError("An error occurred while adding the expense");
      console.error(err);
    }
  }

  // Delete expense handler
  async function handleDeleteExpense(id: string) {
    try {
      setError(null);
      await fetch(`/api/expenses/${id}`, { method: "DELETE" });
      setExpenses(expenses.filter((e) => e.id !== id));
    } catch (err) {
      setError("An error occurred while deleting the expense");
      console.error(err);
    }
  }

  // Edit expense handler
  async function handleEditExpense(id: string, updated: { title: string; amount: number; date: string }) {
    try {
      setError(null);
      const res = await fetch(`/api/expenses/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "Failed to update expense");
        return;
      }
      
      setExpenses(expenses.map((e) => (e.id === id ? data : e)));
      setEditingId(null);
    } catch (err) {
      setError("An error occurred while updating the expense");
      console.error(err);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {editingId === null && <ExpenseForm onSubmit={handleAddExpense} initialData={{}} submitLabel="Add Expense" />}
      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        expenses.map((expense) => (
          <div key={expense.id} className="mb-4">
            {editingId === expense.id ? (
              <div className="border-l-4 border-blue-600 bg-blue-50 p-4 rounded mb-2">
                <ExpenseForm
                  initialData={{
                    title: expense.title,
                    amount: expense.amount,
                    date: expense.date.slice(0, 10),
                  }}
                  onSubmit={(updated) => handleEditExpense(expense.id, updated)}
                  submitLabel="Update Expense"
                />
                <button
                  onClick={() => setEditingId(null)}
                  className="text-gray-600 text-sm mt-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <ExpenseCard title={expense.title} amount={expense.amount} date={expense.date} />
                <div className="flex gap-3">
                  <button
                    onClick={() => setEditingId(expense.id)}
                    className="text-blue-600 text-sm mt-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteExpense(expense.id)}
                    className="text-red-600 text-sm mt-1"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
