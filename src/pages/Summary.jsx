import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Summary = () => {
  const bills = [
    { id: 1, name: "Electricity", amount: 1200, dueDate: "2025-07-25" },
    { id: 2, name: "Water", amount: 300, dueDate: "2025-07-22" },
    { id: 3, name: "Internet", amount: 999, dueDate: "2025-07-30" },
  ];

  const tasks = [
    { id: 1, title: "Buy groceries", status: "Pending" },
    { id: 2, title: "Pay electricity", status: "Completed" },
    { id: 3, title: "Laundry", status: "Pending" },
    { id: 4, title: "Call plumber", status: "Completed" },
  ];

  const groceryStats = [
    { category: "Fruits", count: 5 },
    { category: "Vegetables", count: 8 },
    { category: "Dairy", count: 3 },
    { category: "Bakery", count: 4 },
    { category: "Snacks", count: 6 },
    { category: "Meat", count: 2 },
  ];

  const totalBills = useMemo(() => {
    return bills.reduce((sum, b) => sum + Number(b.amount), 0);
  }, [bills]);

  const taskStats = useMemo(() => {
    return tasks.reduce(
      (acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
      },
      { Pending: 0, Completed: 0 }
    );
  }, [tasks]);

  const billData = useMemo(() => {
    const labels = bills.map(b => b.name);
    const data = bills.map(b => b.amount);

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: ["#f87171", "#60a5fa", "#34d399"],
          hoverOffset: 20,
        },
      ],
    };
  }, [bills]);

  const groceryData = useMemo(() => {
    return {
      labels: groceryStats.map(item => item.category),
      datasets: [
        {
          data: groceryStats.map(item => item.count),
          backgroundColor: [
            "#fcd34d", // yellow
            "#86efac", // green
            "#a5b4fc", // indigo
            "#fdba74", // orange
            "#fca5a5", // red
            "#93c5fd", // blue
          ],
          hoverOffset: 15,
        },
      ],
    };
  }, [groceryStats]);

  return (
    <section className="w-full min-h-screen px-6 py-10 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 text-gray-800 font-sans">
      <h1 className="text-5xl font-extrabold text-center text-emerald-700 mb-12 drop-shadow-md">📈 ZenLife Summary</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Bills Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-cyan-700">💰 Bill Breakdown</h2>
          <p className="text-lg">Total Payable: <span className="font-bold text-emerald-600">৳{totalBills.toLocaleString()}</span></p>
          <div className="max-w-xs">
            <Pie data={billData} options={{ plugins: { legend: { position: "bottom" } } }} />
          </div>
        </div>

        {/* Tasks Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-cyan-700">📝 Task Snapshot</h2>
          <div className="space-y-1">
            <p className="text-gray-700">📌 Pending Tasks: <strong>{taskStats.Pending}</strong></p>
            <p className="text-gray-700">✅ Completed Tasks: <strong>{taskStats.Completed}</strong></p>
          </div>
        </div>
      </div>

      {/* Grocery Categories Section */}
      <div className="mt-16 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-2xl font-semibold text-cyan-700 mb-2">🛍️ Grocery Categories</h2>
          <ul className="flex flex-wrap gap-3 text-gray-700 text-sm">
            {groceryStats.map((item, index) => (
              <li
                key={index}
                className="bg-white shadow px-4 py-1 rounded-full border border-emerald-200 hover:bg-emerald-50"
              >
                {item.category} <span className="text-gray-500">({item.count})</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="max-w-xs mx-auto">
          <Pie data={groceryData} options={{ plugins: { legend: { position: "bottom" } } }} />
        </div>
      </div>
    </section>
  );
};

export default Summary;