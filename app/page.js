"use client";

import { useState, useEffect } from "react";
import BalanceCard from "./components/BalanceCard";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import ExpenseChart from "./components/ExpenseChart";
import StatsCards from "./components/StatsCards";
import MonthlyAnalytics from "./components/MonthlyAnalytics";
import CategoryChart from "./components/CategoryChart";
import ExportCSV from "./components/ExportCSV";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) setDarkMode(JSON.parse(savedTheme));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("darkMode", JSON.stringify(darkMode));
      if (darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [darkMode, mounted]);

  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "All" || t.type === filterType;
    return matchesSearch && matchesType;
  });

  if (!mounted) return null;

  return (
    <div
      style={{ background: "var(--bg-primary)", minHeight: "100vh", padding: "40px 16px 80px" }}
      className="transition-colors duration-300"
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        {/* Header */}
        <div className="fade-up" style={{ marginBottom: 40, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: "linear-gradient(135deg, var(--accent-green), var(--accent-blue))",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Finance Tracker
              </span>
            </div>
            <h1 className="font-serif" style={{ fontSize: "clamp(36px, 6vw, 52px)", lineHeight: 1.1, color: "var(--text-primary)", fontWeight: 400 }}>
              Your Money,<br />
              <span style={{ color: "var(--accent-green)" }}>Clearly.</span>
            </h1>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: "10px 16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "var(--text-secondary)",
              fontSize: 13,
              fontWeight: 500,
              fontFamily: "inherit",
              transition: "all 0.2s ease",
              boxShadow: "var(--shadow-sm)",
              marginTop: 8,
            }}
          >
            {darkMode ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
                Light Mode
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
                Dark Mode
              </>
            )}
          </button>
        </div>

        {/* Balance + Summary */}
        <div className="fade-up fade-up-1">
          <BalanceCard balance={balance} />
        </div>
        <div className="fade-up fade-up-2">
          <SummaryCards income={income} expenses={expenses} />
        </div>

        {/* Charts */}
        <div className="fade-up fade-up-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <ExpenseChart income={income} expenses={expenses} />
          <CategoryChart transactions={transactions} />
        </div>

        {/* Monthly Analytics */}
        <div className="fade-up fade-up-3">
          <MonthlyAnalytics transactions={transactions} />
        </div>

        {/* Add Transaction */}
        <div className="fade-up fade-up-4">
          <TransactionForm transactions={transactions} setTransactions={setTransactions} />
        </div>

        {/* Search & Filter */}
        <div className="fade-up fade-up-4 card" style={{ padding: "20px 24px", marginTop: 16 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
              <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }}
                width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder="Search transactions…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-base"
                style={{ paddingLeft: 40 }}
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="input-base"
              style={{ width: "auto", minWidth: 140 }}
            >
              <option value="All">All Types</option>
              <option value="Income">Income only</option>
              <option value="Expense">Expenses only</option>
            </select>
          </div>
        </div>

        {/* Transactions */}
        <div className="fade-up fade-up-5">
          <TransactionList transactions={filteredTransactions} setTransactions={setTransactions} />
        </div>

        {/* Stats + Export */}
        <div className="fade-up fade-up-5">
          <StatsCards transactions={transactions} />
        </div>
        <div className="fade-up fade-up-5">
          <ExportCSV transactions={transactions} />
        </div>

      </div>
    </div>
  );
}
