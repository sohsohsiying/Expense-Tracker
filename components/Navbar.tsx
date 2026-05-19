import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link href="/" style={styles.logo}>
          💰 Expense Tracker
        </Link>
        <ul style={styles.navLinks}>
          <li>
            <Link href="/" style={styles.link}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/expenses" style={styles.link}>
              Expenses
            </Link>
          </li>
          <li>
            <Link href="/about" style={styles.link}>
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: "#1f2937",
    padding: "16px 0",
    borderBottom: "2px solid #374151",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  logo: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#ffffff",
    textDecoration: "none",
    cursor: "pointer",
    transition: "color 0.3s",
  },
  navLinks: {
    display: "flex",
    listStyle: "none",
    gap: "32px",
    margin: 0,
    padding: 0,
  },
  link: {
    color: "#d1d5db",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: 500,
    transition: "color 0.3s",
    cursor: "pointer",
  } as React.CSSProperties,
} satisfies Record<string, React.CSSProperties>;
