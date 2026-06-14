import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-8">
        Shared Expenses Management System
      </h1>

      <div className="grid grid-cols-2 gap-4 max-w-xl">

        <Link
          href="/users"
          className="border p-4 rounded"
        >
          Users
        </Link>

        <Link
          href="/groups"
          className="border p-4 rounded"
        >
          Groups
        </Link>

        <Link
          href="/members"
          className="border p-4 rounded"
        >
          Members
        </Link>

        <Link
          href="/expenses"
          className="border p-4 rounded"
        >
          Expenses
        </Link>

        <Link
          href="/settlements"
          className="border p-4 rounded"
        >
          Settlements
        </Link>

        <Link
          href="/balance"
          className="border p-4 rounded"
        >
          Balances
        </Link>

        <Link
          href="/import"
          className="border p-4 rounded"
        >
          Import CSV
        </Link>

        <Link
          href="/import-report"
          className="border p-4 rounded"
        >
          Import Report
        </Link>

      </div>
    </main>
  );
}