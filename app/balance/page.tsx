"use client";

import { useEffect, useState } from "react";

export default function BalancesPage() {
  const [balances, setBalances] = useState<any[]>([]);

  async function loadBalances() {
    const res = await fetch("/api/balances");
    const data = await res.json();

    setBalances(data);
  }

  useEffect(() => {
    loadBalances();
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        Balances
      </h1>

      <div className="mt-6">
        {balances.map((b) => (
          <div
            key={b.user}
            className="border p-3 rounded mb-2"
          >
            <strong>{b.user}</strong>

            <br />

            Paid: ₹ {b.totalPaid}
          </div>
        ))}
      </div>
    </main>
  );
}