import { useState } from "react";
import { NavLink } from "react-router";
import {
  FaHome,
  FaTasks,
  FaMoneyBillWave,
  FaCartPlus,
  FaChartPie,
  FaSignOutAlt,
} from "react-icons/fa";
import { TbSettings } from "react-icons/tb";
import { PiExcludeSquareFill } from "react-icons/pi";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`min-h-screen bg-white shadow-xl border-r transition-all duration-300 flex flex-col justify-between ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Top Section */}
      <div className="px-4 py-5 space-y-8">
        {/* Logo + Toggle */}
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h2 className="text-2xl font-extrabold text-green-600 tracking-tight">
              ZenLife
            </h2>
          )}
          <button
            className="text-gray-600 text-xl focus:outline-none"
            onClick={() => setCollapsed(!collapsed)}
          >
            <PiExcludeSquareFill />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2">
          <SidebarItem
            to="/tasks"
            icon={<FaTasks />}
            label="Tasks"
            collapsed={collapsed}
          />
          <SidebarItem
            to="/bills"
            icon={<FaMoneyBillWave />}
            label="Bills"
            collapsed={collapsed}
          />
          <SidebarItem
            to="/grocery"
            icon={<FaCartPlus />}
            label="Groceries"
            collapsed={collapsed}
          />
          <SidebarItem
            to="/summary"
            icon={<FaChartPie />}
            label="Summary"
            collapsed={collapsed}
          />
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="px-4 pb-6 space-y-2 text-gray-700">
        <SidebarItem
          to="/settings"
          icon={<TbSettings />}
          label="Settings"
          collapsed={collapsed}
        />
        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-green-100 transition-colors text-left">
          <span className="text-lg">
            <FaSignOutAlt />
          </span>
          {!collapsed && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

const SidebarItem = ({ to, icon, label, collapsed }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition-all ${
          isActive ? "bg-green-100 text-green-700" : "text-gray-700"
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
};

export default Sidebar;