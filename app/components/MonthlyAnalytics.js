export default function MonthlyAnalytics({
  transactions,
}) {

  const currentMonth =
    new Date().getMonth();

  const currentYear =
    new Date().getFullYear();

  const monthlyTransactions =
    transactions.filter((transaction) => {

      if (!transaction.date) return false;

      const transactionDate =
        new Date(transaction.date);

      return (
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      );
    });

  const monthlyIncome =
    monthlyTransactions
      .filter(
        (transaction) =>
          transaction.type === "Income"
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0
      );

  const monthlyExpenses =
    monthlyTransactions
      .filter(
        (transaction) =>
          transaction.type === "Expense"
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0
      );

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg mt-6 border border-gray-100">

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Monthly Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* MONTHLY INCOME */}
        <div className="bg-green-500 text-white p-6 rounded-2xl">

          <p className="opacity-80">
            Monthly Income
          </p>

          <h3 className="text-3xl font-bold mt-3">
            ${monthlyIncome.toLocaleString()}
          </h3>

        </div>

        {/* MONTHLY EXPENSES */}
        <div className="bg-red-500 text-white p-6 rounded-2xl">

          <p className="opacity-80">
            Monthly Expenses
          </p>

          <h3 className="text-3xl font-bold mt-3">
            ${monthlyExpenses.toLocaleString()}
          </h3>

        </div>

      </div>

    </div>
  );
}