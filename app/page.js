import BalanceCard from "./components/BalanceCard";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-5xl font-bold text-gray-800 mb-2">
          Finance Tracker
        </h1>

        <p className="text-gray-600 mb-8">
          Track your income and expenses easily.
        </p>

        <BalanceCard />

        <SummaryCards />

        <TransactionForm />

      </div>

    </main>
  );
}