import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import {
  Add,
  BusinessCenterOutlined,
  CalendarMonth,
  Checklist,
  Dashboard,
  Group,
  Menu,
  NotificationsOutlined,
  Search,
  SettingsOutlined,
} from "@mui/icons-material";
import Image from "next/image";
import Logo from "../public/Logo.png";
import CreateDealModal from "./Deals/CreateDeal";

const Layout: React.FC<{ children: ReactNode; title: string }> = ({
  children,
  title,
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string>("dashboard");

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const handleIconClick = (icon: string) => setSelectedIcon(icon);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const iconMap: Record<string, string> = {
      "/": "dashboard",
      "/deals": "deals",
      "/notifications": "notifications",
      "/settings": "settings",
      "/calendar": "calendar",
      "/checklist": "checklist",
      "/group": "group",
      "/add": "add",
    };
    setSelectedIcon(iconMap[currentPath] || "dashboard");
  }, []);

  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-[#F6FAFDE5] text-white w-24 transition-transform  transform border-r border-gray-200 ${
          isSidebarOpen
            ? "translate-x-0 bg-white"
            : "-translate-x-full bg-white"
        } lg:translate-x-0 lg:relative lg:w-24`}
        role="navigation"
        aria-label="Sidebar"
      >
        <div className="flex flex-col h-full bg-[#F6FAFDE5]">
          <div className="flex items-center justify-center h-16 border-b border-[#EAEEF4]">
            <Link href="/">
              <Image src={Logo} alt="Logo" className="h-10 w-auto" />
            </Link>
          </div>
          <div className="flex flex-col gap-6 items-center bg-[#F6FAFDE5] rounded mt-6">
            <Link href="/">
              <button
                className={`flex items-center border ${
                  selectedIcon === "dashboard"
                    ? "bg-[#514EF3] text-white"
                    : "bg-white text-[#7E92A2]"
                } rounded-full p-3`}
                onClick={() => handleIconClick("dashboard")}
                aria-label="Dashboard"
                role="menuitem"
              >
                <Dashboard />
              </button>
            </Link>
            <Link href="/deals">
              <button
                aria-label="Deals"
                className={`flex items-center border ${
                  selectedIcon === "deals"
                    ? "bg-[#514EF3] text-white"
                    : "bg-white text-[#7E92A2]"
                } rounded-full p-3`}
                onClick={() => handleIconClick("deals")}
                role="menuitem"
              >
                <BusinessCenterOutlined />
              </button>
            </Link>
            <Link href="/group">
              <button
                className={`flex items-center border ${
                  selectedIcon === "group"
                    ? "bg-[#514EF3] text-white"
                    : "bg-white text-[#7E92A2]"
                } rounded-full p-3`}
                onClick={() => handleIconClick("group")}
                aria-label="Group"
                role="menuitem"
              >
                <Group />
              </button>
            </Link>
            <Link href="/checklist">
              <button
                className={`flex items-center border ${
                  selectedIcon === "checklist"
                    ? "bg-[#514EF3] text-white"
                    : "bg-white text-[#7E92A2]"
                } rounded-full p-3`}
                onClick={() => handleIconClick("checklist")}
                aria-label="Checklist"
                role="menuitem"
              >
                <Checklist />
              </button>
            </Link>
            <Link href="/calendarMonth">
              <button
                className={`flex items-center border ${
                  selectedIcon === "calendarMonth"
                    ? "bg-[#514EF3] text-white"
                    : "bg-white text-[#7E92A2]"
                } rounded-full p-3`}
                onClick={() => handleIconClick("calendarMonth")}
                aria-label="Calendar"
                role="menuitem"
              >
                <CalendarMonth />
              </button>
            </Link>
            <Link href="/notifications">
              <button
                className={`flex items-center border ${
                  selectedIcon === "notifications"
                    ? "bg-[#514EF3] text-white"
                    : "bg-white text-[#7E92A2]"
                } rounded-full p-3`}
                onClick={() => handleIconClick("notifications")}
                aria-label="Notifications"
                role="menuitem"
              >
                <NotificationsOutlined />
              </button>
            </Link>
            <Link href="/settings">
              <button
                className={`flex items-center border ${
                  selectedIcon === "settings"
                    ? "bg-[#514EF3] text-white"
                    : "bg-white text-[#7E92A2]"
                } rounded-full p-3`}
                onClick={() => handleIconClick("settings")}
                aria-label="Settings"
                role="menuitem"
              >
                <SettingsOutlined />
              </button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-grow ml-0">
        <header
          aria-label="Header"
          role="banner"
          className="flex items-center justify-between border-b h-16 border-[#EAEEF4] bg-[#F6FAFDE5] p-4 px-2 lg:px-4 md:px-4"
        >
          <div className="flex items-center">
            <button
              aria-label="Toggle sidebar"
              role="button"
              className="lg:hidden"
              onClick={toggleSidebar}
            >
              <Menu
                className="text-lg text-black"
                aria-label="Toggle sidebar"
              />
            </button>
            <h2 className="text-lg font-semibold ml-4 text-black">{title}</h2>
          </div>
          <div className="flex items-center space-x-1 md:space-x-4">
            <button
              className="flex items-center p-2 px-4 rounded-full bg-[#514EF3] "
              onClick={() => setCreateModalOpen(true)}
              aria-label="Add New"
              role="button"
            >
              <span
                className="hidden lg:inline text-sm"
                style={{ fontSize: "14px", marginRight: "0.5rem" }}
              >
                Add New
              </span>
              <Add className="text-md text-white" />
            </button>
            <button
              aria-label="Search"
              role="button"
              className="flex items-center border bg-white rounded-full p-2"
            >
              <Search className="text-md text-[#7E92A2]" aria-label="Search" />
            </button>
            <div className="h-8 w-8 bg-gray-300 rounded-full" />
          </div>
        </header>

        {/* Main content area */}
        <main
          onClick={closeSidebar}
          className="p-4 overflow-auto h-[calc(100vh-64px)] bg-[#F6FAFDE5]"
          role="main"
        >
          {children}
        </main>
      </div>

      {/* CreateDealModal */}
      <CreateDealModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </div>
  );
};

export default Layout;
