"use client";

import { useState } from "react";
import BalanceCard from "./components/BalanceCard";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

export default function Home() {

  const [transactions, setTransactions] = useState([]);

  const income = transactions
  .filter((transaction) => transaction.type === "Income")
  .reduce((total, transaction) => total + transaction.amount, 0);

const expenses = transactions
  .filter((transaction) => transaction.type === "Expense")
  .reduce((total, transaction) => total + transaction.amount, 0);

const balance = income - expenses;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-5xl font-bold text-gray-800 mb-2">
          Finance Tracker
        </h1>

        <p className="text-gray-600 mb-8">
          Track your income and expenses easily.
        </p>

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

      </div>

    </main>
  );
}