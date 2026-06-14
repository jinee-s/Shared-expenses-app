"use client";

import { useEffect, useState } from "react";

export default function ImportReportPage() {
  const [anomalies, setAnomalies] = useState<any[]>([]);

  async function loadAnomalies() {
    const res = await fetch("/api/import-report");
    const data = await res.json();
    setAnomalies(data);
  }

  useEffect(() => {
    loadAnomalies();
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        Import Report
      </h1>

      <div className="mt-6">
        {anomalies.map((anomaly) => (
          <div
            key={anomaly.id}
            className="border p-3 rounded mb-2"
          >
            Row: {anomaly.rowNumber}
            <br />
            Issue: {anomaly.issueType}
            <br />
            Action: {anomaly.actionTaken}
          </div>
        ))}
      </div>
    </main>
  );
}