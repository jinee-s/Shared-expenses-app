"use client";

import { useEffect, useState } from "react";

export default function SettlementsPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [settlements, setSettlements] = useState<any[]>([]);

  const [fromUserId, setFromUserId] = useState("");
  const [toUserId, setToUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  async function loadData() {
    const usersRes = await fetch("/api/users");
    const settlementsRes = await fetch("/api/settlements");

    setUsers(await usersRes.json());
    setSettlements(await settlementsRes.json());
  }

  async function createSettlement() {
    await fetch("/api/settlements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fromUserId,
        toUserId,
        amount,
        date,
      }),
    });

    loadData();
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        Settlements
      </h1>

      <div className="flex flex-col gap-3 max-w-md mt-6">

        <select
          value={fromUserId}
          onChange={(e) => setFromUserId(e.target.value)}
          className="border p-2"
        >
          <option value="">From User</option>

          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <select
          value={toUserId}
          onChange={(e) => setToUserId(e.target.value)}
          className="border p-2"
        >
          <option value="">To User</option>

          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2"
        />

        <button
          onClick={createSettlement}
          className="bg-black text-white p-2 rounded"
        >
          Create Settlement
        </button>
      </div>

      <div className="mt-10">
        <h2 className="font-semibold text-xl">
          Existing Settlements
        </h2>

        {settlements.map((s) => (
          <div
            key={s.id}
            className="border p-3 rounded mt-2"
          >
            ₹ {s.amount}
          </div>
        ))}
      </div>
    </main>
  );
}