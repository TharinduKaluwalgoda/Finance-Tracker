"use client";

export default function StatsCards({ transactions }) {
  const total = transactions.length;

  const incomeArr = transactions.filter((t) => t.type === "Income");
  const expenseArr = transactions.filter((t) => t.type === "Expense");

  const largestIncome = incomeArr.length > 0 ? Math.max(...incomeArr.map((t) => t.amount)) : 0;
  const largestExpense = expenseArr.length > 0 ? Math.max(...expenseArr.map((t) => t.amount)) : 0;

  const avgExpense = expenseArr.length > 0
    ? expenseArr.reduce((s, t) => s + t.amount, 0) / expenseArr.length
    : 0;

  const stats = [
    { label: "Total Transactions", value: total, unit: "", color: "var(--accent-blue)", bg: "#f0f4fa" },
    { label: "Largest Income", value: `$${largestIncome.toLocaleString()}`, unit: "", color: "var(--accent-green)", bg: "var(--accent-green-light)" },
    { label: "Largest Expense", value: `$${largestExpense.toLocaleString()}`, unit: "", color: "var(--accent-red)", bg: "var(--accent-red-light)" },
    { label: "Avg. Expense", value: `$${Math.round(avgExpense).toLocaleString()}`, unit: "", color: "var(--accent-gold)", bg: "var(--accent-gold-light)" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
      {stats.map((s) => (
        <div key={s.label} className="card" style={{ padding: "18px 20px" }}>
          <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 8, fontWeight: 500 }}>{s.label}</p>
          <p style={{ fontSize: 22, fontWeight: 700, color: s.color, fontVariantNumeric: "tabular-nums" }}>
            {s.value}
          </p>
        </div>
      ))}
    </div>
  );
}
