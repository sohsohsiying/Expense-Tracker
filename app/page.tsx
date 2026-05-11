// page.tsx inside the `app/` folder = the home page (route: "/").
//
// In Next.js (App Router), every folder inside `app/` that contains a
// `page.tsx` becomes a URL route. This file lives at `app/page.tsx`,
// so it maps to the "/" (root) route of your site.
//
// Example routes:
//   app/page.tsx          → "/"
//   app/about/page.tsx    → "/about"
//   app/expenses/page.tsx → "/expenses"

// `Link` is Next.js's built-in component for client-side navigation.
// Use it instead of <a> tags so that navigating between pages is fast
// and doesn't trigger a full browser reload.
import Link from "next/link";

// By default, every component in the App Router is a SERVER component.
// That means this function runs on the server — it can fetch data directly
// from a database or API without exposing secrets to the browser.
export default function Home() {
  return (
    // Tailwind CSS utility classes — `p-8` adds padding on all sides.
    <main className="p-8">
      <h1>Home</h1>
      {/* TODO: Implement the content of the home page */}
    </main>
  );
}
