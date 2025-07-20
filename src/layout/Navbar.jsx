import React, { useState, useRef, useEffect } from "react";

const notifications = [
  { id: 1, text: "New user signed up" },
  { id: 2, text: "Server CPU usage high" },
  { id: 3, text: "Payment received" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full bg-white px-8 py-4 flex justify-between items-center border-b border-gray-300 relative">
      {/* Left: Logo / Title */}
      <div className="text-3xl font-extrabold text-emerald-700 select-none">
        ZenLife
      </div>

      {/* Right: Notifications + Profile */}
      <div className="flex items-center space-x-6 relative">
        {/* Notification Bell */}
        <button
          aria-label="Notifications"
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2 rounded-full hover:bg-emerald-100 transition focus:outline-none focus:ring-2 focus:ring-emerald-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 hover:text-emerald-600 transition"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>

          {/* Notification badge */}
          <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full select-none">
            {notifications.length}
          </span>
        </button>

        {/* Notification Dropdown */}
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-12 top-full mt-2 w-64 bg-white shadow-lg rounded-md border border-gray-200 z-50"
          >
            <div className="p-3 border-b border-gray-100 font-semibold text-gray-700">
              Notifications
            </div>
            <ul className="max-h-60 overflow-y-auto">
              {notifications.map((note) => (
                <li
                  key={note.id}
                  className="px-4 py-2 hover:bg-emerald-50 cursor-pointer text-gray-600 text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  {note.text}
                </li>
              ))}
              {notifications.length === 0 && (
                <li className="px-4 py-2 text-gray-400 text-sm">
                  No new notifications
                </li>
              )}
            </ul>
          </div>
        )}

        {/* User Profile */}
        <div className="flex items-center space-x-3 cursor-pointer">
          <img
            src="https://i.pinimg.com/736x/a5/22/95/a52295c50244662e1447805a0490e03f.jpg"
            alt="User avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500"
          />
          <span className="font-semibold text-gray-700 select-none hidden sm:block">
            Abida
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
