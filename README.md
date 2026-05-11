# Next.js Workshop — Part 1: Setup & Tour

> **Orbital 2026** · Developer Student Club NUS
> Branch: `part-1-setup`

---

## Starting from scratch (optional reading)

If you want to create a new Next.js project from scratch outside of this workshop, run:

```bash
npx create-next-app@latest my-app
```

You'll be prompted to choose a few options. For a setup similar to this repo, select:

- TypeScript → **Yes**
- ESLint → **Yes**
- Tailwind CSS → **Yes**
- `src/` directory → **No**
- App Router → **Yes**
- Customize import alias → **No**

Then `cd my-app && npm run dev` to get started.

---

## Getting started (follow along in the workshop)

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_REPO_URL
cd orbital-nextjs-workshop
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your environment variables

Copy the example env file:

```bash
cp .env.example .env
```

Then open `.env` and fill in your database URL (you'll get this from Neon in Part 3):

```
DATABASE_URL="your-neon-connection-string-here"
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the app running.

---

## Folder structure

```
orbital-nextjs-workshop/
  app/
    page.tsx              # home page → route: /
    expenses/
      page.tsx            # expense list → route: /expenses
      actions.ts          # server actions (we'll fill these in during the workshop)
  components/
    ExpenseCard.tsx       # pre-built card UI for displaying an expense
    ExpenseForm.tsx       # form for adding expenses (we'll build this in Part 4)
  lib/
    db.ts                 # Prisma client singleton
  prisma/
    schema.prisma         # database schema — defines the Expense model
  .env.example            # template for your environment variables
  .gitignore              # includes .env so secrets don't get committed
  README.md               # you're reading it!
```

## Questions?

Reach out to us on Telegram:
- Kai — @kai120306
- Shermaine — @soheepyying