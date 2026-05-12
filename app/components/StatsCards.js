export default function StatsCards({
  transactions,
}) {

  const totalTransactions =
    transactions.length;

  const incomeTransactions =
    transactions.filter(
      (transaction) =>
        transaction.type === "Income"
    );

  const expenseTransactions =
    transactions.filter(
      (transaction) =>
        transaction.type === "Expense"
    );

  const largestIncome =
    incomeTransactions.length > 0
      ? Math.max(
          ...incomeTransactions.map(
            (transaction) =>
              transaction.amount
          )
        )
      : 0;

  const largestExpense =
    expenseTransactions.length > 0
      ? Math.max(
          ...expenseTransactions.map(
            (transaction) =>
              transaction.amount
          )
        )
      : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">

      {/* TOTAL */}
      <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">

        <p className="text-gray-500 text-sm">
          Total Transactions
        </p>

        <h2 className="text-3xl font-bold mt-3 text-gray-800">
          {totalTransactions}
        </h2>

      </div>

      {/* LARGEST INCOME */}
      <div className="bg-green-500 text-white p-6 rounded-3xl shadow-lg">

        <p className="text-sm opacity-80">
          Largest Income
        </p>

        <h2 className="text-3xl font-bold mt-3">
          ${largestIncome.toLocaleString()}
        </h2>

      </div>

      {/* LARGEST EXPENSE */}
      <div className="bg-red-500 text-white p-6 rounded-3xl shadow-lg">

        <p className="text-sm opacity-80">
          Largest Expense
        </p>

        <h2 className="text-3xl font-bold mt-3">
          ${largestExpense.toLocaleString()}
        </h2>

      </div>

    </div>
  );
}