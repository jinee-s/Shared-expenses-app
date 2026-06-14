"use client";

import { useEffect, useState } from "react";

export default function MembersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);

  const [groupId, setGroupId] = useState("");
  const [userId, setUserId] = useState("");
  const [joinedAt, setJoinedAt] = useState("");
  const [leftAt, setLeftAt] = useState("");

  async function loadData() {
    const usersRes = await fetch("/api/users");
    const groupsRes = await fetch("/api/groups");
    const membersRes = await fetch("/api/members");

    setUsers(await usersRes.json());
    setGroups(await groupsRes.json());
    setMembers(await membersRes.json());
  }

  async function addMember() {
    await fetch("/api/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId,
        userId,
        joinedAt,
        leftAt: leftAt || null,
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
        Group Members
      </h1>

      <div className="mt-6 flex flex-col gap-3 max-w-md">

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
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border p-2"
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={joinedAt}
          onChange={(e) => setJoinedAt(e.target.value)}
          className="border p-2"
        />

        <input
          type="date"
          value={leftAt}
          onChange={(e) => setLeftAt(e.target.value)}
          className="border p-2"
        />

        <button
          onClick={addMember}
          className="bg-black text-white p-2 rounded"
        >
          Add Member
        </button>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold">
          Existing Memberships
        </h2>

        {members.map((member) => (
          <div
            key={member.id}
            className="border p-3 mt-2 rounded"
          >
            {member.user.name} → {member.group.name}
            <br />
            Joined: {member.joinedAt?.slice(0, 10)}
            <br />
            Left: {member.leftAt?.slice(0, 10) || "Active"}
          </div>
        ))}
      </div>
    </main>
  );
}