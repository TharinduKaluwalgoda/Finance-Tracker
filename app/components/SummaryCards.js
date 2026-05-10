export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

      <div className="bg-green-500 text-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold">
          Income
        </h2>

        <p className="text-3xl font-bold mt-4">
          $0.00
        </p>
      </div>

      <div className="bg-red-500 text-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold">
          Expenses
        </h2>

        <p className="text-3xl font-bold mt-4">
          $0.00
        </p>
      </div>

    </div>
  );
}