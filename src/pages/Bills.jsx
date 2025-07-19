import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaClock,
  FaTimes,
  FaBell,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const initialBills = [
  { id: 1, name: "Electricity", amount: 1200, dueDate: "2025-07-25" },
  { id: 2, name: "Water", amount: 300, dueDate: "2025-07-22" },
  { id: 3, name: "Internet", amount: 999, dueDate: "2025-07-30" },
];

const getTimeParts = (dueDate) => {
  const now = new Date();
  const target = new Date(dueDate);
  const diff = target - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
};

const Bills = () => {
  const [bills, setBills] = useState(initialBills);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", amount: "", dueDate: "" });
  const [timeParts, setTimeParts] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedParts = {};
      bills.forEach((bill) => {
        updatedParts[bill.id] = getTimeParts(bill.dueDate);
      });
      setTimeParts(updatedParts);
    }, 1000);
    return () => clearInterval(interval);
  }, [bills]);

  useEffect(() => {
    const nearDue = bills.some((b) => {
      const parts = getTimeParts(b.dueDate);
      return parts && parts.days < 2;
    });
    setShowAlert(nearDue);
  }, [timeParts, bills]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      setBills((prev) =>
        prev.map((b) => (b.id === editing.id ? { ...b, ...form } : b))
      );
    } else {
      setBills((prev) => [...prev, { id: Date.now(), ...form }]);
    }
    setModalOpen(false);
    setForm({ name: "", amount: "", dueDate: "" });
    setEditing(null);
  };

  const openModal = (bill = null) => {
    setEditing(bill);
    setForm(
      bill
        ? { name: bill.name, amount: bill.amount, dueDate: bill.dueDate }
        : { name: "", amount: "", dueDate: "" }
    );
    setModalOpen(true);
  };

  const deleteBill = (id) => {
    setBills((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="min-h-screen p-6 bg-green-50 text-gray-800">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-green-800">
          📅 Monthly Bills Timeline
        </h1>
        <button
          onClick={() => openModal()}
          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 px-5 py-2 rounded-xl font-semibold"
        >
          <FaPlus /> Add Bill
        </button>
      </div>

      {showAlert && (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-xl flex items-center gap-3 mb-6">
          <FaBell className="text-yellow-500" /> Some bills are due soon! Don't
          forget to pay!
        </div>
      )}

      <div className="relative border-l-4 border-green-500 pl-6">
        {bills
          .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
          .map((bill) => (
            <motion.div
              key={bill.id}
              className="mb-8 relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute -left-[30px] top-2 w-4 h-4 bg-green-500 rounded-full"></div>
              <div className="bg-white p-4 rounded-xl shadow-md">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-bold text-green-800">
                      {bill.name}
                    </h2>
                    <p className="text-gray-600">৳ {bill.amount}</p>
                    <div className="text-sm mt-2 flex items-center gap-2">
                      <FaClock className="text-yellow-500" />
                      {timeParts[bill.id] ? (
                        <span className="font-mono text-green-800">
                          ⏳ {timeParts[bill.id].days}d{" "}
                          {timeParts[bill.id].hours}h{" "}
                          {timeParts[bill.id].minutes}m{" "}
                          {timeParts[bill.id].seconds}s
                        </span>
                      ) : (
                        <span className="text-red-600 font-semibold">Due!</span>
                      )}
                      <span className="text-gray-500">
                        (Due: {bill.dueDate})
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => openModal(bill)}
                      className="text-green-700 hover:text-green-900"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteBill(bill.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              className="bg-white p-6 rounded-xl w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-green-800">
                  {editing ? "Edit Bill" : "Add Bill"}
                </h2>
                <button onClick={() => setModalOpen(false)}>
                  <FaTimes className="text-gray-400 hover:text-gray-600" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Bill Name"
                  className="w-full border px-4 py-2 rounded-lg"
                  required
                />
                <input
                  type="number"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  placeholder="Amount (৳)"
                  className="w-full border px-4 py-2 rounded-lg"
                  required
                />
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) =>
                    setForm({ ...form, dueDate: e.target.value })
                  }
                  className="w-full border px-4 py-2 rounded-lg"
                  required
                />
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                  >
                    {editing ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Bills;
