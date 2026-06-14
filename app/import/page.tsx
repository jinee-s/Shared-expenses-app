"use client";

import { useState } from "react";

export default function ImportPage() {
  const [file, setFile] = useState<File | null>(null);

  async function handleImport() {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/import", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

console.log(data);

alert(
  `Imported ${data.rows} rows\nAnomalies Found: ${data.anomaliesFound}`
);
  }

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        Import CSV
      </h1>

      <div className="mt-6">
        <input
          type="file"
          accept=".csv"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
          }
        />

        <button
          onClick={handleImport}
          className="bg-black text-white px-4 py-2 ml-2 rounded"
        >
          Import
        </button>
      </div>
    </main>
  );
}