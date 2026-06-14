"use client";

import { useEffect, useState } from "react";

export default function ExpensesPage() {
  const [groups, setGroups] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [groupId, setGroupId] = useState("");
  const [paidById, setPaidById] = useState("");
  const [date, setDate] = useState("");
  const [splitType, setSplitType] = useState("EQUAL");

  async function loadData() {
    const groupsRes = await fetch("/api/groups");
    const usersRes = await fetch("/api/users");
    const expensesRes = await fetch("/api/expenses");

    setGroups(await groupsRes.json());
    setUsers(await usersRes.json());
    setExpenses(await expensesRes.json());
  }

  async function createExpense() {
    await fetch("/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description,
        amount,
        currency,
        groupId,
        paidById,
        date,
        splitType,
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
        Expenses
      </h1>

      <div className="mt-6 flex flex-col gap-3 max-w-md">

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2"
        />

        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2"
        />

        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="border p-2"
        >
          <option>INR</option>
          <option>USD</option>
        </select>

        <select
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
          className="border p-2"
        >
          <option value="">Select Group</option>

          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>

        <select
          value={paidById}
          onChange={(e) => setPaidById(e.target.value)}
          className="border p-2"
        >
          <option value="">Paid By</option>

          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2"
        />

        <button
          onClick={createExpense}
          className="bg-black text-white p-2 rounded"
        >
          Create Expense
        </button>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold">
          Existing Expenses
        </h2>

        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="border p-3 mt-2 rounded"
          >
            {expense.description}
            <br />
            ₹ {expense.amount}
            <br />
            Paid By: {expense.paidBy?.name}
            <br />
            Group: {expense.group?.name}
          </div>
        ))}
      </div>
    </main>
  );
}