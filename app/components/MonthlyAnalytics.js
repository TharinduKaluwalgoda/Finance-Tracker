"use client";

export default function MonthlyAnalytics({ transactions }) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthly = transactions.filter((t) => {
    if (!t.date) return false;
    const d = new Date(t.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const monthlyIncome = monthly.filter((t) => t.type === "Income").reduce((s, t) => s + t.amount, 0);
  const monthlyExpenses = monthly.filter((t) => t.type === "Expense").reduce((s, t) => s + t.amount, 0);
  const net = monthlyIncome - monthlyExpenses;

  const monthName = now.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const barWidth = monthlyIncome > 0 ? Math.min(100, (monthlyExpenses / monthlyIncome) * 100) : 0;

  return (
    <div className="card" style={{ padding: "24px 28px", marginTop: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Monthly Analytics
        </p>
        <span style={{ fontSize: 12, color: "var(--text-secondary)", background: "var(--bg-card-alt)", padding: "4px 10px", borderRadius: 20, border: "1px solid var(--border)" }}>
          {monthName}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
        <div>
          <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>Income</p>
          <p style={{ fontSize: 20, fontWeight: 700, color: "var(--accent-green)", fontVariantNumeric: "tabular-nums" }}>
            ${monthlyIncome.toLocaleString()}
          </p>
        </div>
        <div>
          <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>Expenses</p>
          <p style={{ fontSize: 20, fontWeight: 700, color: "var(--accent-red)", fontVariantNumeric: "tabular-nums" }}>
            ${monthlyExpenses.toLocaleString()}
          </p>
        </div>
        <div>
          <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>Net</p>
          <p style={{ fontSize: 20, fontWeight: 700, color: net >= 0 ? "var(--accent-green)" : "var(--accent-red)", fontVariantNumeric: "tabular-nums" }}>
            {net >= 0 ? "+" : "−"}${Math.abs(net).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Spending bar */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Spending ratio</span>
          <span style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 600 }}>{Math.round(barWidth)}%</span>
        </div>
        <div style={{ height: 6, background: "var(--bg-card-alt)", borderRadius: 999, overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${barWidth}%`,
            background: barWidth > 80 ? "var(--accent-red)" : barWidth > 60 ? "var(--accent-gold)" : "var(--accent-green)",
            borderRadius: 999,
            transition: "width 0.6s ease",
          }}/>
        </div>
      </div>
    </div>
  );
}
