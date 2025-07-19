import React, { useState } from "react";
import {
  FaPlus,
  FaTimes,
  FaTrash,
  FaEdit,
  FaCarrot,
  FaSeedling,
  FaCheese,
} from "react-icons/fa";

const categoryIcons = {
  Dairy: <FaCheese className="text-yellow-500" />,
  Grains: <FaSeedling className="text-green-600" />,
  Vegetables: <FaCarrot className="text-orange-500" />,
};

const initialData = {
  Dairy: [
    {
      id: 1,
      name: "Milk",
      quantity: "2 Liters",
      buyer: "Abida",
      price: 120,
      purchased: 70,
    },
    {
      id: 2,
      name: "Cheese",
      quantity: "500g",
      buyer: "Nadim",
      price: 250,
      purchased: 40,
    },
  ],
  Grains: [
    {
      id: 3,
      name: "Rice",
      quantity: "5 KG",
      buyer: "Tuli",
      price: 450,
      purchased: 100,
    },
    {
      id: 4,
      name: "Lentils",
      quantity: "2 KG",
      buyer: "Abida",
      price: 150,
      purchased: 20,
    },
  ],
  Vegetables: [
    {
      id: 5,
      name: "Carrot",
      quantity: "1 KG",
      buyer: "Nadim",
      price: 80,
      purchased: 0,
    },
    {
      id: 6,
      name: "Spinach",
      quantity: "500g",
      buyer: "Tuli",
      price: 50,
      purchased: 60,
    },
  ],
};

export default function Grocery() {
  const [categories, setCategories] = useState(initialData);
  const [activeCategory, setActiveCategory] = useState("Dairy");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({
    id: null,
    category: activeCategory,
    name: "",
    quantity: "",
    buyer: "",
    price: "",
    purchased: 0,
  });

  // Open modal for add or edit
  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setForm({ ...item, category: activeCategory });
    } else {
      setEditingItem(null);
      setForm({
        id: null,
        category: activeCategory,
        name: "",
        quantity: "",
        buyer: "",
        price: "",
        purchased: 0,
      });
    }
    setModalOpen(true);
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "purchased" ? Number(value) : value,
    }));
  };

  // Submit add or edit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.quantity.trim() || !form.buyer.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    setCategories((prev) => {
      const newCategories = { ...prev };

      // Editing item
      if (editingItem) {
        // If category changed, remove from old category & add to new category
        if (form.category !== activeCategory) {
          newCategories[activeCategory] = newCategories[activeCategory].filter(
            (i) => i.id !== form.id
          );
          newCategories[form.category] = [
            ...newCategories[form.category],
            { ...form },
          ];
        } else {
          // Update item in the same category
          newCategories[activeCategory] = newCategories[activeCategory].map(
            (i) => (i.id === form.id ? { ...form } : i)
          );
        }
      } else {
        // Add new item
        const newId =
          Math.max(
            0,
            ...Object.values(newCategories)
              .flat()
              .map((i) => i.id)
          ) + 1;
        const newItem = { ...form, id: newId };
        newCategories[form.category] = [
          ...newCategories[form.category],
          newItem,
        ];
      }

      return newCategories;
    });

    setModalOpen(false);
  };

  // Delete item
  const deleteItem = (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    setCategories((prev) => {
      const newCategories = { ...prev };
      newCategories[activeCategory] = newCategories[activeCategory].filter(
        (i) => i.id !== id
      );
      return newCategories;
    });
  };

  // Switch active category & close modal if open
  const handleCategorySwitch = (category) => {
    setActiveCategory(category);
    if (modalOpen) setModalOpen(false);
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto p-8 bg-gradient-to-tr from-green-50 to-green-100 text-gray-900">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-green-800">
        🛒 Grocery Management System
      </h1>

      {/* Category Tabs */}
      <div className="flex justify-center mb-6 space-x-8 border-b-2 border-green-300">
        {Object.keys(categories).map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategorySwitch(cat)}
            className={`pb-3 font-semibold text-lg flex items-center gap-2 ${
              activeCategory === cat
                ? "border-b-4 border-green-600 text-green-800"
                : "text-green-500 hover:text-green-700"
            } transition`}
            aria-current={activeCategory === cat ? "true" : undefined}
          >
            {categoryIcons[cat]} {cat}
          </button>
        ))}
      </div>

      {/* Add Item Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => openModal()}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold flex items-center gap-2"
        >
          <FaPlus /> Add Item
        </button>
      </div>

      {/* Item List */}
      <ul className="space-y-4">
        {categories[activeCategory].length === 0 ? (
          <p className="text-center text-gray-600">
            No items in this category yet.
          </p>
        ) : (
          categories[activeCategory].map((item) => (
            <li
              key={item.id}
              className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center"
              title="Click edit or delete"
            >
              <div className="flex flex-col max-w-[60%]">
                <span className="font-semibold text-lg truncate">
                  {item.name}
                </span>
                <small className="text-gray-600">
                  Qty: {item.quantity} &bull; Buyer: {item.buyer}
                </small>
              </div>
              <div className="flex flex-col items-end min-w-[130px]">
                <span className="font-semibold text-green-700 mb-1">
                  ৳{item.price}
                </span>
                <div className="w-full bg-green-100 rounded-full h-3 mb-1">
                  <div
                    className="bg-green-600 h-3 rounded-full transition-all"
                    style={{ width: `${item.purchased}%` }}
                  />
                </div>
                <small className="text-xs text-gray-500">
                  {item.purchased}% purchased
                </small>
              </div>
              <div className="flex gap-3 ml-4">
                <button
                  onClick={() => openModal(item)}
                  className="text-green-700 hover:text-green-900"
                  aria-label={`Edit ${item.name}`}
                >
                  <FaEdit size={20} />
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-red-600 hover:text-red-800"
                  aria-label={`Delete ${item.name}`}
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              aria-label="Close modal"
            >
              <FaTimes size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-green-800">
              {editingItem ? "Edit Item" : "Add New Item"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  {Object.keys(categories).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Quantity
                </label>
                <input
                  type="text"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Buyer</label>
                <input
                  type="text"
                  name="buyer"
                  value={form.buyer}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Price (৳)
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  min={0}
                  required
                  className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Purchased (%)
                </label>
                <input
                  type="number"
                  name="purchased"
                  value={form.purchased}
                  onChange={handleChange}
                  min={0}
                  max={100}
                  className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                >
                  {editingItem ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}