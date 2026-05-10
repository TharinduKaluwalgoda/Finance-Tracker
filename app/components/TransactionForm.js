"use client";

import { useState } from "react";

export default function TransactionForm() {

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Income");

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg mt-6 border border-gray-100">

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Add Transaction
      </h2>

      <form className="space-y-4">

        <input
          type="text"
          placeholder="Transaction Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-black"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-black"
        >
          <option>Income</option>
          <option>Expense</option>
        </select>

        <button
          className="bg-black hover:bg-gray-800 transition text-white px-6 py-4 rounded-xl w-full font-semibold"
        >
          Add Transaction
        </button>

      </form>

    </div>
  );
}