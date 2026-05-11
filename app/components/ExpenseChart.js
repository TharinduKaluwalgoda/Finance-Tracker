"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function ExpenseChart({
  income,
  expenses,
}) {

  const data = {
    labels: ["Income", "Expenses"],

    datasets: [
      {
        data: [income, expenses],

        backgroundColor: [
          "#22c55e",
          "#ef4444",
        ],

        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg mt-6 border border-gray-100">

      <h2 className="text-2xl font-bold mb-6">
        Financial Overview
      </h2>

      <div className="max-w-sm mx-auto">
        <Doughnut data={data} />
      </div>

    </div>
  );
}