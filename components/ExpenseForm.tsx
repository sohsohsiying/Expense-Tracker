// ExpenseForm.tsx — form component for adding (and later editing) expenses
// Used in the client-side list to submit new expenses to the API
// --> handles user input, form state, and submission—all of which require React’s features like hooks (useState).
"use client";
import { useState } from "react";

/* Defines the props the form expects:
    -  onSubmit: Function to call when the form is submitted (receives the expense data).
    -  initialData: (Optional) Pre-fills the form for editing.
    -  submitLabel: (Optional) Button label (Later defaults to "Add Expense").
*/
type ExpenseFormProps = {
  onSubmit: (expense: { title: string; amount: number; date: string }) => void;
  initialData?: { title?: string; amount?: number; date?: string };
  submitLabel?: string;
};

export default function ExpenseForm({ onSubmit, initialData = {}, submitLabel = "Add Expense" }: ExpenseFormProps) {
  // Sets up state variables for each form field, initialized from initialData if provided
  const [title, setTitle] = useState(initialData?.title || "");
  const [amount, setAmount] = useState<string>(initialData?.amount?.toString() || "");
  const [date, setDate] = useState(initialData?.date ? initialData.date.slice(0, 10) : ""); // YYYY-MM-DD format for date input

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit({ title, amount: parseFloat(String(amount)), date });
    // Resets all form fields to empty after submission, clearing the form for the next entry.
    setTitle("");
    setAmount("");
    setDate("");
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        required
        className="border p-2 rounded w-full"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
        required
        min="0.01"
        step="0.01"
        className="border p-2 rounded w-full"
      />
      <input
        type="date"
        value={date}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
        required
        className="border p-2 rounded w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {submitLabel}
      </button>
    </form>
  );
}
