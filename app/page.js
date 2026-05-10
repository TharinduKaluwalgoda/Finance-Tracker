import BalanceCard from "./components/BalanceCard";
import SummaryCards from "./components/SummaryCards";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-gray-800">
        Personal Finance Tracker
      </h1>
      <BalanceCard />
      
      <SummaryCards />
    </main>
  );
}