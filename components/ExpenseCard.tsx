// ExpenseCard.tsx — a reusable UI component.
//
// Components live in the `components/` folder by convention.
// They are just functions that return JSX (HTML-like syntax).
// You can drop <ExpenseCard /> anywhere in your app and it will
// render this same piece of UI — that's the power of reusability.
//
// Later you'll add "props" to this component so that each card can
// display different data (e.g. a different expense name or amount).
// Props are passed like HTML attributes: <ExpenseCard name="Coffee" amount={4.50} />

// `type` defines the shape of the props this component accepts.
// TypeScript will warn you if you forget to pass a required prop.
type ExpenseCardProps = {
  title: string;
  amount: number;
  date: Date | string;
};

export default function ExpenseCard({ title, amount, date }: ExpenseCardProps) {
  // Format the date into something readable like "May 11, 2026"
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Format the amount as a dollar value like "$12.50"
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  return (
    <div style={styles.card}>
      {/* Left side: expense title and date */}
      <div>
        <p style={styles.title}>{title}</p>
        <p style={styles.date}>{formattedDate}</p>
      </div>

      {/* Right side: the dollar amount */}
      <span style={styles.amount}>{formattedAmount}</span>
    </div>
  );
}

// Keeping styles in the same file makes the component self-contained.
// In a larger project you might use CSS modules or Tailwind instead.
const styles = {
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#ffffff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    marginBottom: "12px",
  },
  title: {
    margin: 0,
    fontWeight: 600,
    fontSize: "15px",
    color: "#111827",
  },
  date: {
    margin: "4px 0 0",
    fontSize: "13px",
    color: "#6b7280",
  },
  amount: {
    fontWeight: 700,
    fontSize: "16px",
    color: "#16a34a",
  },
} satisfies Record<string, React.CSSProperties>;
