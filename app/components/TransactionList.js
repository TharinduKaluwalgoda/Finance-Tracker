"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function TransactionList({
  transactions,
  setTransactions,
}) {

  // EDIT STATES
  const [editingId, setEditingId] = useState(null);

  const [editedTitle, setEditedTitle] = useState("");

  const [editedAmount, setEditedAmount] = useState("");

  // DELETE TRANSACTION
  const deleteTransaction = (id) => {

    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );

    setTransactions(updatedTransactions);
  };

  // START EDITING
  const startEditing = (transaction) => {

    setEditingId(transaction.id);

    setEditedTitle(transaction.title);

    setEditedAmount(transaction.amount);
  };

  // SAVE EDIT
  const saveEdit = (id) => {

    const updatedTransactions =
      transactions.map((transaction) => {

        if (transaction.id === id) {
          return {
            ...transaction,
            title: editedTitle,
            amount: Number(editedAmount),
          };
        }

        return transaction;
      });

    setTransactions(updatedTransactions);

    setEditingId(null);
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg mt-6 border border-gray-100">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-gray-800">
          Transactions
        </h2>

        <p className="text-sm text-gray-500">
          {transactions.length} total
        </p>

      </div>

      {/* EMPTY STATE */}
      {transactions.length === 0 ? (

        <div className="text-center py-10 text-gray-400">
          No transactions added yet.
        </div>

      ) : (

        <div className="space-y-4">

          {transactions.map((transaction) => (

            <motion.div
              key={transaction.id}

              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}

              transition={{ duration: 0.3 }}

              className="flex items-center justify-between bg-gray-50 p-5 rounded-2xl"
            >

              {/* LEFT SIDE */}
              <div>

                {/* TITLE */}
                {editingId === transaction.id ? (

                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) =>
                      setEditedTitle(e.target.value)
                    }
                    className="border p-2 rounded-lg text-black"
                  />

                ) : (

                  <h3 className="font-semibold text-lg text-gray-800">
                    {transaction.title}
                  </h3>

                )}

                {/* TAGS */}
                <div className="flex items-center gap-2 mt-2">

                  {/* TYPE */}
                  <span
                    className={
                      transaction.type === "Income"
                        ? "text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full"
                        : "text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full"
                    }
                  >
                    {transaction.type}
                  </span>

                  {/* CATEGORY */}
                  <span className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
                    {transaction.category}
                  </span>
                <p className="text-sm text-gray-500 mt-2">
                    {transaction.date}
                </p>


                </div>

              </div>

              {/* RIGHT SIDE */}
              <div className="flex items-center gap-4">

                {/* AMOUNT */}
                {editingId === transaction.id ? (

                  <input
                    type="number"
                    value={editedAmount}
                    onChange={(e) =>
                      setEditedAmount(e.target.value)
                    }
                    className="border p-2 rounded-lg w-24 text-black"
                  />

                ) : (

                  <p
                    className={
                      transaction.type === "Income"
                        ? "text-green-600 font-bold text-lg"
                        : "text-red-600 font-bold text-lg"
                    }
                  >
                    ${transaction.amount.toLocaleString()}
                  </p>

                )}

                {/* EDIT / SAVE BUTTON */}
                {editingId === transaction.id ? (

                  <button
                    onClick={() =>
                      saveEdit(transaction.id)
                    }
                    className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition"
                  >
                    Save
                  </button>

                ) : (

                  <button
                    onClick={() =>
                      startEditing(transaction)
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>

                )}

                {/* DELETE BUTTON */}
                <button
                  onClick={() =>
                    deleteTransaction(transaction.id)
                  }
                  className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
                >
                  Delete
                </button>

              </div>

            </motion.div>

          ))}

        </div>

      )}

    </div>
  );
}