export default function ExportCSV({
  transactions,
}) {

  const exportToCSV = () => {

    // CSV HEADERS
    const headers = [
      "Title",
      "Amount",
      "Type",
      "Category",
      "Date",
    ];

    // CSV ROWS
    const rows = transactions.map(
      (transaction) => [
        transaction.title,
        transaction.amount,
        transaction.type,
        transaction.category,
        transaction.date,
      ]
    );

    // COMBINE
    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) => row.join(","))
      .join("\n");

    // CREATE FILE
    const blob = new Blob(
      [csvContent],
      { type: "text/csv" }
    );

    const url =
      window.URL.createObjectURL(blob);

    // DOWNLOAD LINK
    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "transactions.csv";

    link.click();

    // CLEANUP
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-6">

      <button
        onClick={exportToCSV}
        className="bg-black text-white px-6 py-4 rounded-2xl hover:bg-gray-800 transition font-semibold w-full"
      >
        Export Transactions CSV
      </button>

    </div>
  );
}