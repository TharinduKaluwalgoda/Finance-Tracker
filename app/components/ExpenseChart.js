"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseChart({ income, expenses }) {
  const hasData = income > 0 || expenses > 0;

  const data = {
    labels: ["Income", "Expenses"],
    datasets: [{
      data: hasData ? [income, expenses] : [1, 0],
      backgroundColor: hasData ? ["#1a7a4a", "#c0392b"] : ["#e8e6df", "#e8e6df"],
      borderWidth: 0,
      hoverOffset: 4,
    }],
  };

  const options = {
    cutout: "72%",
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` $${ctx.parsed.toLocaleString()}`,
        },
      },
    },
    animation: { animateRotate: true, duration: 800 },
  };

  const savingsRate = income > 0 ? Math.round(((income - expenses) / income) * 100) : 0;

  return (
    <div className="card" style={{ padding: "20px 20px 24px" }}>
      <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16 }}>
        Overview
      </p>
      <div style={{ position: "relative", maxWidth: 140, margin: "0 auto" }}>
        <Doughnut data={data} options={options} />
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)", textAlign: "center",
        }}>
          <p style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1 }}>
            {savingsRate}%
          </p>
          <p style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>saved</p>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#1a7a4a" }}/>
          <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>Income</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#c0392b" }}/>
          <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>Expenses</span>
        </div>
      </div>
    </div>
  );
}
