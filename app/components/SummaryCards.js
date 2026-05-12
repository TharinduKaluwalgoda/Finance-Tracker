"use client";

import { motion } from "framer-motion";

export default function SummaryCards({
  income,
  expenses,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}

      className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6"
    >

      <motion.div
        whileHover={{ scale: 1.03 }}

        className="bg-green-500 text-white p-6 rounded-3xl shadow-lg"
      >

        <h2 className="text-lg opacity-80">
          Income
        </h2>

        <p className="text-4xl font-bold mt-3">
          ${income.toLocaleString()}
        </p>

      </motion.div>

      <motion.div
        whileHover={{ scale: 1.03 }}

        className="bg-red-500 text-white p-6 rounded-3xl shadow-lg"
      >

        <h2 className="text-lg opacity-80">
          Expenses
        </h2>

        <p className="text-4xl font-bold mt-3">
          ${expenses.toLocaleString()}
        </p>

      </motion.div>

    </motion.div>
  );
}