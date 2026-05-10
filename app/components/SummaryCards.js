export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">

      <div className="bg-green-500 text-white p-6 rounded-3xl shadow-lg">
        <h2 className="text-lg opacity-80">
          Income
        </h2>

        <p className="text-4xl font-bold mt-3">
          $0.00
        </p>
      </div>

      <div className="bg-red-500 text-white p-6 rounded-3xl shadow-lg">
        <h2 className="text-lg opacity-80">
          Expenses
        </h2>

        <p className="text-4xl font-bold mt-3">
          $0.00
        </p>
      </div>

    </div>
  );
}