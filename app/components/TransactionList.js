export default function TransactionList({
  transactions,
  setTransactions,
}) {

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );

    setTransactions(updatedTransactions);
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg mt-6 border border-gray-100">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Transactions
        </h2>

        <p className="text-sm text-gray-500">
          {transactions.length} total
        </p>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          No transactions added yet.
        </div>
      ) : (
        <div className="space-y-4">

          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between bg-gray-50 p-5 rounded-2xl"
            >

              <div>

                <h3 className="font-semibold text-lg text-gray-800">
                  {transaction.title}
                </h3>

                <div className="flex items-center gap-2 mt-2">

                  <span
                    className={
                      transaction.type === "Income"
                        ? "text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full"
                        : "text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full"
                    }
                  >
                    {transaction.type}
                  </span>

                  <span className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
                    {transaction.category}
                  </span>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <p
                  className={
                    transaction.type === "Income"
                      ? "text-green-600 font-bold text-lg"
                      : "text-red-600 font-bold text-lg"
                  }
                >
                  ${transaction.amount.toLocaleString()}
                </p>

                <button
                  onClick={() => deleteTransaction(transaction.id)}
                  className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}