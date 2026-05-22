"use client";

export default function ExportCSV({ transactions }) {
  const exportToCSV = () => {
    const headers = ["Title", "Amount", "Type", "Category", "Date"];
    const rows = transactions.map((t) => [
      `"${t.title.replace(/"/g, '""')}"`,
      t.amount,
      t.type,
      t.category,
      t.date,
    ]);
    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `transactions-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ marginTop: 16, marginBottom: 8 }}>
      <button
        onClick={exportToCSV}
        disabled={transactions.length === 0}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: 12,
          border: "1px solid var(--border)",
          background: "var(--bg-card)",
          color: transactions.length === 0 ? "var(--text-muted)" : "var(--text-primary)",
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "inherit",
          cursor: transactions.length === 0 ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          transition: "background 0.2s ease",
          boxShadow: "var(--shadow-sm)",
        }}
        onMouseOver={(e) => { if (transactions.length > 0) e.currentTarget.style.background = "var(--bg-card-alt)"; }}
        onMouseOut={(e) => { e.currentTarget.style.background = "var(--bg-card)"; }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Export to CSV {transactions.length > 0 && `(${transactions.length} transactions)`}
      </button>
    </div>
  );
}
