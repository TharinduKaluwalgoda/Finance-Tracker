"use client";

import { useState } from "react";

const CATEGORIES = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Health", "Salary", "Freelance", "Other"];

export default function TransactionForm({ transactions, setTransactions }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Income");
  const [category, setCategory] = useState("Salary");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !amount || !date) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    const newTransaction = {
      id: Date.now(),
      title: title.trim(),
      amount: parseFloat(amount),
      type,
      category,
      date,
    };
    setTransactions([newTransaction, ...transactions]);
    setTitle("");
    setAmount("");
    setType("Income");
    setCategory("Salary");
    setDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <div className="card" style={{ padding: "24px 28px", marginTop: 16 }}>
      <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 20 }}>
        Add Transaction
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}
        className={shake ? "shake" : ""}>

        {/* Type toggle */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {["Income", "Expense"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { setType(t); setCategory(t === "Income" ? "Salary" : "Food"); }}
              style={{
                padding: "12px",
                borderRadius: 12,
                border: "1px solid",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: 14,
                fontWeight: 600,
                transition: "all 0.2s ease",
                borderColor: type === t
                  ? (t === "Income" ? "var(--accent-green)" : "var(--accent-red)")
                  : "var(--border)",
                background: type === t
                  ? (t === "Income" ? "var(--accent-green-light)" : "var(--accent-red-light)")
                  : "var(--bg-card-alt)",
                color: type === t
                  ? (t === "Income" ? "var(--accent-green)" : "var(--accent-red)")
                  : "var(--text-secondary)",
              }}
            >
              {t === "Income" ? "↑ Income" : "↓ Expense"}
            </button>
          ))}
        </div>

        {/* Title + Amount row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 10 }}>
          <input
            type="text"
            placeholder="Transaction title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-base"
          />
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", fontSize: 14, pointerEvents: "none" }}>$</span>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
              className="input-base"
              style={{ paddingLeft: 28, width: 120 }}
            />
          </div>
        </div>

        {/* Category + Date */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-base">
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-base"
          />
        </div>

        <button
          type="submit"
          style={{
            background: "var(--text-primary)",
            color: "var(--bg-primary)",
            border: "none",
            borderRadius: 12,
            padding: "14px",
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "inherit",
            cursor: "pointer",
            transition: "opacity 0.2s ease",
            marginTop: 4,
          }}
          onMouseOver={(e) => e.target.style.opacity = "0.85"}
          onMouseOut={(e) => e.target.style.opacity = "1"}
        >
          Add Transaction
        </button>
      </form>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        .shake { animation: shake 0.35s ease; }
      `}</style>
    </div>
  );
}
