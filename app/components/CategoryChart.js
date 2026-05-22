"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = ["#1a7a4a", "#c0392b", "#c8923a", "#1a4a7a", "#7a1a6a", "#1a6a7a", "#4a7a1a"];

export default function CategoryChart({ transactions }) {
  const expenseTransactions = transactions.filter((t) => t.type === "Expense");

  const categoryTotals = {};
  expenseTransactions.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  const labels = Object.keys(categoryTotals);
  const values = Object.values(categoryTotals);

  const data = {
    labels,
    datasets: [{
      data: values.length > 0 ? values : [1],
      backgroundColor: values.length > 0 ? COLORS.slice(0, labels.length) : ["#e8e6df"],
      borderWidth: 0,
      hoverOffset: 4,
    }],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` $${ctx.parsed.toLocaleString()}`,
        },
      },
    },
    animation: { duration: 800 },
  };

  return (
    <div className="card" style={{ padding: "20px 20px 24px" }}>
      <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16 }}>
        Categories
      </p>
      {expenseTransactions.length === 0 ? (
        <div style={{ textAlign: "center", padding: "30px 0", color: "var(--text-muted)", fontSize: 13 }}>
          No expenses yet
        </div>
      ) : (
        <>
          <div style={{ maxWidth: 130, margin: "0 auto" }}>
            <Pie data={data} options={options} />
          </div>
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 5 }}>
            {labels.slice(0, 4).map((label, i) => (
              <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS[i] }}/>
                  <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>{label}</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-primary)" }}>
                  ${values[i].toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
