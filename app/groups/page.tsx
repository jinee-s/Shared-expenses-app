"use client";

import { useEffect, useState } from "react";

export default function GroupsPage() {
  const [name, setName] = useState("");
  const [groups, setGroups] = useState<any[]>([]);

  async function loadGroups() {
    const res = await fetch("/api/groups");
    const data = await res.json();
    setGroups(data);
  }

  async function createGroup() {
    await fetch("/api/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    setName("");
    loadGroups();
  }

  useEffect(() => {
    loadGroups();
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        Groups
      </h1>

      <div className="mt-4 flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Group Name"
          className="border p-2 rounded"
        />

        <button
          onClick={createGroup}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Existing Groups
        </h2>

        {groups.map((group) => (
          <div
            key={group.id}
            className="border p-3 rounded mb-2"
          >
            {group.name}
          </div>
        ))}
      </div>
    </main>
  );
}