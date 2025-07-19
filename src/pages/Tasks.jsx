// Improved, responsive, clean UI for Task Manager
import React, { useState } from "react";
import { FaPlus, FaCheckCircle, FaTimes } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const initialTasks = [
  { id: 1, title: "Pay Rent", date: "2025-07-03", status: "Pending" },
  { id: 2, title: "Call Electrician", date: "2025-07-07", status: "Completed" },
  { id: 3, title: "Buy Groceries", date: "2025-07-07", status: "Pending" },
  { id: 4, title: "Doctor Appointment", date: "2025-07-15", status: "Pending" },
  { id: 5, title: "Team Meeting", date: "2025-07-21", status: "Completed" },
];

const generateDays = (year, month) => {
  const date = new Date(year, month, 1);
  const days = [];
  const startDay = date.getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < startDay; i++) days.push(null);
  for (let i = 1; i <= totalDays; i++) {
    days.push(new Date(year, month, i));
  }
  return days;
};

const Tasks = () => {
  const today = new Date();
  const [tasks, setTasks] = useState(initialTasks);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDate, setNewTaskDate] = useState(
    today.toISOString().slice(0, 10)
  );
  const [newTaskStatus, setNewTaskStatus] = useState("Pending");
  const [editingTask, setEditingTask] = useState(null);

  const days = generateDays(today.getFullYear(), today.getMonth());

  const filteredTasks = (date) => {
    if (!date) return [];
    const dayStr = date.toISOString().split("T")[0];
    return tasks.filter(
      (t) => t.date === dayStr && (filter === "All" || t.status === filter)
    );
  };

  const openAddModal = () => {
    setEditingTask(null);
    setNewTaskTitle("");
    setNewTaskDate(
      selected
        ? selected.toISOString().slice(0, 10)
        : today.toISOString().slice(0, 10)
    );
    setNewTaskStatus("Pending");
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setNewTaskTitle(task.title);
    setNewTaskDate(task.date);
    setNewTaskStatus(task.status);
    setIsModalOpen(true);
  };

  const handleAddOrUpdateTask = () => {
    if (!newTaskTitle.trim()) return alert("Enter task title");
    if (!newTaskDate) return alert("Select a date");

    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTask.id
            ? {
                ...t,
                title: newTaskTitle.trim(),
                date: newTaskDate,
                status: newTaskStatus,
              }
            : t
        )
      );
    } else {
      const newTask = {
        id: tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
        title: newTaskTitle.trim(),
        date: newTaskDate,
        status: newTaskStatus,
      };
      setTasks((prev) => [...prev, newTask]);
    }
    setIsModalOpen(false);
    setSelected(new Date(newTaskDate));
  };

  const filteredSelectedTasks = selected ? filteredTasks(selected) : [];

  return (
    <div className="min-h-screen bg-zinc-50 p-4 md:p-8 font-sans text-[16px] text-gray-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">
          {today.toLocaleString("default", { month: "long" })}{" "}
          {today.getFullYear()}
        </h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl text-base font-semibold transition"
        >
          <FaPlus /> Add Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {["All", "Pending", "Completed"].map((f) => (
          <button
            key={f}
            className={`px-4 py-2 rounded-full font-medium text-sm transition ${
              filter === f
                ? "bg-green-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-2 md:gap-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center font-medium text-zinc-500 text-sm"
          >
            {day}
          </div>
        ))}

        {days.map((day, idx) => {
          const dayTasks = day && filteredTasks(day);
          const isSelected = day?.toDateString() === selected?.toDateString();
          const isToday = day?.toDateString() === today.toDateString();

          return (
            <div
              key={idx}
              onClick={() => day && setSelected(day)}
              className={`min-h-[80px] p-2 rounded-xl border cursor-pointer flex flex-col justify-between ${
                isToday
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 bg-white"
              } ${isSelected ? "ring-2 ring-green-500" : ""}`}
            >
              <span className="text-sm font-semibold text-zinc-700">
                {day?.getDate() || ""}
              </span>
              <div className="flex flex-col gap-1 mt-1">
                {dayTasks?.slice(0, 2).map((task) => (
                  <span
                    key={task.id}
                    className={`text-[11px] px-2 py-1 rounded-full truncate ${
                      task.status === "Completed"
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-900"
                    }`}
                  >
                    {task.title}
                  </span>
                ))}
                {dayTasks?.length > 2 && (
                  <span className="text-[11px] text-gray-400">
                    +{dayTasks.length - 2} more
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Day Tasks */}
      {selected && (
        <div className="bg-white mt-8 p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-zinc-900">
              Tasks on {selected.toDateString()}
            </h2>
            <button
              onClick={() => setSelected(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={20} />
            </button>
          </div>
          {filteredSelectedTasks.length > 0 ? (
            <ul className="space-y-3">
              {filteredSelectedTasks.map((task) => (
                <li
                  key={task.id}
                  onClick={() => openEditModal(task)}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-lg hover:bg-green-100 cursor-pointer"
                >
                  <span className="font-medium text-zinc-800 truncate max-w-[70%]">
                    {task.title}
                  </span>
                  <span
                    className={`flex items-center gap-2 text-sm font-semibold ${
                      task.status === "Completed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {task.status}{" "}
                    {task.status === "Completed" && <FaCheckCircle />}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No tasks for this day.
            </p>
          )}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-bold text-zinc-900 mb-4">
                {editingTask ? "Edit Task" : "Add New Task"}
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddOrUpdateTask();
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Task title"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
                <input
                  type="date"
                  value={newTaskDate}
                  onChange={(e) => setNewTaskDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                  min={today.toISOString().slice(0, 10)}
                />
                <select
                  value={newTaskStatus}
                  onChange={(e) => setNewTaskStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg"
                  >
                    {editingTask ? "Update" : "Add"}
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

export default Tasks;
