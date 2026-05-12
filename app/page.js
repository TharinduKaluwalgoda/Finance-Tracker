"use client";

import { useState, useEffect } from "react";
import BalanceCard from "./components/BalanceCard";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import ExpenseChart from "./components/ExpenseChart";

export default function Home() {

  const [transactions, setTransactions] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
  const savedTransactions = localStorage.getItem("transactions");
  useEffect(() => {
  const savedTheme = localStorage.getItem("darkMode");
  useEffect(() => {
  localStorage.setItem(
    "darkMode",
    JSON.stringify(darkMode)
  );
}, [darkMode]);

  if (savedTheme) {
    setDarkMode(JSON.parse(savedTheme));
  }
}, []);

  if (savedTransactions) {
    setTransactions(JSON.parse(savedTransactions));
  }
}, []);

useEffect(() => {
  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
  );
}, [transactions]);

  const income = transactions
  .filter((transaction) => transaction.type === "Income")
  .reduce((total, transaction) => total + transaction.amount, 0);

const expenses = transactions
  .filter((transaction) => transaction.type === "Expense")
  .reduce((total, transaction) => total + transaction.amount, 0);

const balance = income - expenses;

  return (
    <main
  className={
    darkMode
      ? "min-h-screen bg-gradient-to-br from-gray-900 to-black py-10 px-4 transition"
      : "min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4 transition"
  }
>

      <div className="max-w-3xl mx-auto">

        <h1 className={`text-5xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}
>
  Finance Tracker
</h1>

        <p className="text-gray-600 mb-8">
          Track your income and expenses easily.
        </p>

        <button
  onClick={() => setDarkMode(!darkMode)}
  className={
    darkMode
      ? "bg-white text-black px-5 py-3 rounded-xl font-semibold mb-8"
      : "bg-black text-white px-5 py-3 rounded-xl font-semibold mb-8"
  }
>
  {darkMode ? "Light Mode" : "Dark Mode"}
</button>

        <BalanceCard balance={balance} />

        <SummaryCards
            income={income}
            expenses={expenses}
        />

        <TransactionForm
            transactions={transactions}
            setTransactions={setTransactions}
        />

        <TransactionList
            transactions={transactions}
            setTransactions={setTransactions}
        />

        <ExpenseChart
            income={income}
            expenses={expenses}
        />

      </div>

    </main>
  );
}