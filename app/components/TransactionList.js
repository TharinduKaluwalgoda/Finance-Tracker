"use client";

import { useState } from "react";

const TYPE_ICONS = {
  Income: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
    </svg>
  ),
  Expense: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
    </svg>
  ),
};

export default function TransactionList({ transactions, setTransactions }) {
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedAmount, setEditedAmount] = useState("");

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const startEditing = (t) => {
    setEditingId(t.id);
    setEditedTitle(t.title);
    setEditedAmount(t.amount);
  };

  const saveEdit = (id) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, title: editedTitle, amount: parseFloat(editedAmount) } : t
      )
    );
    setEditingId(null);
  };

  return (
    <div className="card" style={{ padding: "24px 28px", marginTop: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Transactions
        </p>
        <span style={{ fontSize: 12, color: "var(--text-secondary)", background: "var(--bg-card-alt)", padding: "3px 10px", borderRadius: 20, border: "1px solid var(--border)" }}>
          {transactions.length} {transactions.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      {transactions.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 0", color: "var(--text-muted)" }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: "0 auto 12px", display: "block", opacity: 0.4 }}>
            <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
          </svg>
          <p style={{ fontSize: 14 }}>No transactions yet</p>
          <p style={{ fontSize: 12, marginTop: 4 }}>Add your first transaction above</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {transactions.map((t, i) => (
            <div
              key={t.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 16px",
                background: "var(--bg-card-alt)",
                borderRadius: 12,
                border: "1px solid var(--border)",
                transition: "transform 0.15s ease",
                animation: `fadeUp 0.3s ease ${Math.min(i, 8) * 0.04}s both`,
              }}
            >
              {/* Icon */}
              <div style={{
                width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: t.type === "Income" ? "var(--accent-green-light)" : "var(--accent-red-light)",
                color: t.type === "Income" ? "var(--accent-green)" : "var(--accent-red)",
              }}>
                {TYPE_ICONS[t.type]}
              </div>

              {/* Main info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {editingId === t.id ? (
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="input-base"
                    style={{ padding: "6px 10px", fontSize: 13 }}
                    autoFocus
                  />
                ) : (
                  <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {t.title}
                  </p>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                  <span className="tag-income" style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 20,
                    ...(t.type === "Income"
                      ? { background: "var(--accent-green-light)", color: "var(--accent-green)" }
                      : { background: "var(--accent-red-light)", color: "var(--accent-red)" })
                  }}>
                    {t.type}
                  </span>
                  <span style={{ fontSize: 10, color: "var(--text-muted)", background: "var(--bg-card)", border: "1px solid var(--border)", padding: "2px 8px", borderRadius: 20 }}>
                    {t.category}
                  </span>
                  {t.date && (
                    <span style={{ fontSize: 10, color: "var(--text-muted)" }}>
                      {new Date(t.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  )}
                </div>
              </div>

              {/* Amount + actions */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                {editingId === t.id ? (
                  <input
                    type="number"
                    value={editedAmount}
                    onChange={(e) => setEditedAmount(e.target.value)}
                    className="input-base"
                    style={{ padding: "6px 10px", fontSize: 13, width: 90 }}
                  />
                ) : (
                  <p style={{
                    fontSize: 15, fontWeight: 700, fontVariantNumeric: "tabular-nums",
                    color: t.type === "Income" ? "var(--accent-green)" : "var(--accent-red)",
                  }}>
                    {t.type === "Income" ? "+" : "−"}${t.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                )}

                {editingId === t.id ? (
                  <button
                    onClick={() => saveEdit(t.id)}
                    style={actionBtn("#1a7a4a", "var(--accent-green-light)")}
                    title="Save"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={() => startEditing(t)}
                    style={actionBtn("var(--text-secondary)", "var(--bg-card-alt)")}
                    title="Edit"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                )}

                <button
                  onClick={() => deleteTransaction(t.id)}
                  style={actionBtn("var(--accent-red)", "var(--accent-red-light)")}
                  title="Delete"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                    <path d="M10 11v6"/><path d="M14 11v6"/>
                    <path d="M9 6V4h6v2"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function actionBtn(color, bg) {
  return {
    width: 30, height: 30,
    borderRadius: 8,
    border: "1px solid transparent",
    background: bg,
    color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 0,
    transition: "opacity 0.15s ease",
  };
}
