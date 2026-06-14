"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState<any[]>([]);

  async function loadUsers() {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  }

  async function createUser() {
    await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    });

    setName("");
    setEmail("");

    loadUsers();
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        Users
      </h1>

      <div className="flex gap-2 mt-4">
        <input
          placeholder="Name"
          className="border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={createUser}
          className="bg-black text-white px-4"
        >
          Add User
        </button>
      </div>

      <div className="mt-8">
        {users.map((user) => (
          <div
            key={user.id}
            className="border p-3 mb-2 rounded"
          >
            {user.name} ({user.email})
          </div>
        ))}
      </div>
    </main>
  );
}