import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Promt from "./Promt";
import { Menu } from "lucide-react";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  return (
    <div className="flex h-screen bg-[#1a1a1a] overflow-hidden">
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        onSelectSession={setSelectedSessionId}
        selectedSessionId={selectedSessionId}
      />

      <div className="flex-1 flex flex-col bg-[#1a1a1a] relative">
        {/* 🟢 Fixed Mobile Topbar */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-20 flex items-center justify-between bg-[#1a1a1a] p-4 shadow-md border-b border-gray-800">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="text-white w-6 h-6" />
          </button>
          <h1 className="text-white text-lg font-bold">NeroMax</h1>
        </div>

        {/* 🟢 Scrollable area with padding-top on mobile for fixed navbar height */}
        <div className="flex-1 overflow-y-auto md:pt-0 pt-16">
          <Promt
            selectedSessionId={selectedSessionId}
            sidebarCollapsed={sidebarCollapsed}
          />
        </div>
      </div>
    </div>
  );
}

export default Layout;
