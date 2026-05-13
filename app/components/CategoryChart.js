"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function CategoryChart({
  transactions,
}) {

  // ONLY EXPENSES
  const expenseTransactions =
    transactions.filter(
      (transaction) =>
        transaction.type === "Expense"
    );

  // GROUP BY CATEGORY
  const categoryTotals = {};

  expenseTransactions.forEach((transaction) => {

    const category =
      transaction.category;

    if (categoryTotals[category]) {
      categoryTotals[category] +=
        transaction.amount;
    } else {
      categoryTotals[category] =
        transaction.amount;
    }
  });

  const data = {
    labels: Object.keys(categoryTotals),

    datasets: [
      {
        data: Object.values(categoryTotals),

        backgroundColor: [
          "#ef4444",
          "#3b82f6",
          "#22c55e",
          "#f59e0b",
          "#8b5cf6",
          "#ec4899",
          "#14b8a6",
        ],

        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg mt-6 border border-gray-100">

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Expense Categories
      </h2>

      {expenseTransactions.length === 0 ? (

        <div className="text-gray-400 text-center py-10">
          No expense data available.
        </div>

      ) : (

        <div className="max-w-md mx-auto">
          <Pie data={data} />
        </div>

      )}

    </div>
  );
}