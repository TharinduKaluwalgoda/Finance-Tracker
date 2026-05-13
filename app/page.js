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

  // LOAD TRANSACTIONS
  useEffect(() => {
    const savedTransactions =
      localStorage.getItem("transactions");

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  // SAVE TRANSACTIONS
  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  // LOAD THEME
  useEffect(() => {
    const savedTheme =
      localStorage.getItem("darkMode");

    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  // SAVE THEME
  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );
  }, [darkMode]);

  const income = transactions
    .filter(
      (transaction) =>
        transaction.type === "Income"
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    );

  const expenses = transactions
    .filter(
      (transaction) =>
        transaction.type === "Expense"
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    );

  const balance = income - expenses;

  const filteredTransactions =
    transactions.filter((transaction) => {

      const matchesSearch =
        transaction.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesType =
        filterType === "All" ||
        transaction.type === filterType;

      return matchesSearch && matchesType;
    });

  return (
    <main
      className={
        darkMode
          ? "min-h-screen bg-gradient-to-br from-gray-900 to-black py-10 px-4 transition"
          : "min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4 transition"
      }
    >

      <div className="max-w-3xl mx-auto">

        <h1
          className={`text-5xl font-bold mb-2 ${
            darkMode
              ? "text-white"
              : "text-gray-800"
          }`}
        >
          Finance Tracker
        </h1>

        <p
          className={
            darkMode
              ? "text-gray-300 mb-8"
              : "text-gray-600 mb-8"
          }
        >
          Track your income and expenses easily.
        </p>

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className={
            darkMode
              ? "bg-white text-black px-5 py-3 rounded-xl font-semibold mb-8"
              : "bg-black text-white px-5 py-3 rounded-xl font-semibold mb-8"
          }
        >
          {darkMode
            ? "Light Mode"
            : "Dark Mode"}
        </button>

        <BalanceCard balance={balance} />

        <SummaryCards
          income={income}
          expenses={expenses}
        />

        <ExpenseChart
          income={income}
          expenses={expenses}
        />

        <MonthlyAnalytics
          transactions={transactions}
        />

        <CategoryChart
          transactions={transactions}
        />

        <TransactionForm
          transactions={transactions}
          setTransactions={setTransactions}
        />

        <div className="bg-white p-6 rounded-3xl shadow-lg mt-6 border border-gray-100">

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="flex-1 border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-black text-black bg-white"
            />

            <select
              value={filterType}
              onChange={(e) =>
                setFilterType(e.target.value)
              }
              className="border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-black text-black bg-white"
            >
              <option>All</option>
              <option>Income</option>
              <option>Expense</option>
            </select>

          </div>

        </div>

        <TransactionList
          transactions={filteredTransactions}
          setTransactions={setTransactions}
        />

        <ExportCSV
          transactions={transactions}
        />

        <StatsCards
          transactions={transactions}
        />

      </div>

    </main>
  );
}