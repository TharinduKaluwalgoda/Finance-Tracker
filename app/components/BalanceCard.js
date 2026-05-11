export default function BalanceCard({ balance }) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg mt-8 border border-gray-100">

      <h2 className="text-xl text-gray-500 font-medium">
        Current Balance
      </h2>

      <p className="text-5xl font-bold text-gray-800 mt-4">
        ${balance}
      </p>

    </div>
  );
}