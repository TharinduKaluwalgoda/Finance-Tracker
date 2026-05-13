"use client";

import { useState } from "react";

export default function TransactionForm({
  transactions,
  setTransactions,
}) {

  const [title, setTitle] = useState("");

  const [amount, setAmount] = useState("");

  const [type, setType] = useState("Income");

  const [category, setCategory] = useState("Food");

  const [date, setDate] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    // VALIDATION
    if (!title || !amount || !date) {
      return;
    }

    const newTransaction = {
      id: Date.now(),
      title,
      amount: Number(amount),
      type,
      category,
      date,
    };

    setTransactions([
      ...transactions,
      newTransaction,
    ]);

    // RESET FORM
    setTitle("");

    setAmount("");

    setType("Income");

    setCategory("Food");

    setDate("");
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg mt-6 border border-gray-100">

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Add Transaction
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {/* TITLE */}
        <input
          type="text"
          placeholder="Transaction Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-black text-black bg-white"
        />

        {/* AMOUNT */}
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-black text-black bg-white"
        />

        {/* TYPE */}
        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
          className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-black text-black bg-white"
        >
          <option>Income</option>
          <option>Expense</option>
        </select>

        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-black text-black bg-white"
        >
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Entertainment</option>
          <option>Salary</option>
          <option>Freelance</option>
        </select>

        {/* DATE */}
        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
          className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-black text-black bg-white"
        />

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="bg-black hover:bg-gray-800 transition text-white px-6 py-4 rounded-xl w-full font-semibold"
        >
          Add Transaction
        </button>

      </form>

    </div>
  );
}