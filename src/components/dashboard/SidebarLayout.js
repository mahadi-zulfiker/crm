"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobiles";
import { ChevronLeft, Search, ChevronRight } from "lucide-react";
import getALLRoles from "@/lib/getALLRoles";
import { useSession } from "next-auth/react";

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const { data: session, status } = useSession();
  // const role = session?.user?.role || "user";
  const role = "user";
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState(["attendance"]);
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const roleMenus = getALLRoles();
  const menuItems = roleMenus[role] || roleMenus.user;

  // Auto-collapse on mobile
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  }, [isMobile]);

  // Filter menu items based on search query
  const filteredMenuItems = useMemo(() => {
    if (!searchQuery.trim()) return menuItems;

    return menuItems.filter((item) => {
      const matchesTitle = item.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesSubItems = item.items?.some((subItem) =>
        subItem.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return matchesTitle || matchesSubItems;
    });
  }, [menuItems, searchQuery]);

  // Toggle expanded state
  const toggleExpanded = (itemTitle) => {
    if (isSidebarOpen) return;
    setExpandedItems((prev) =>
      prev.includes(itemTitle.toLowerCase())
        ? prev.filter((item) => item !== itemTitle.toLowerCase())
        : [...prev, itemTitle.toLowerCase()]
    );
  };

  // Get role-specific colors
  const getRoleColors = () => {
    const colorMap = {
      user: { primary: "blue", accent: "blue" },
      employee: { primary: "green", accent: "green" },
      vendor: { primary: "purple", accent: "purple" },
      admin: { primary: "red", accent: "red" },
    };
    return colorMap[role] || colorMap.user;
  };

  const colors = getRoleColors();

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col h-full transition-all duration-300 min-h-screen",
        isSidebarOpen ? "w-16" : "w-80"
      )}
    >
      {/* Header with Toggle */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isSidebarOpen && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">JP</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800 capitalize">
                {role} Portal
              </h2>
              <p className="text-xs text-gray-500">JobPortal Pro</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-gray-100"
        >
          {isSidebarOpen ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Search Bar */}
      {!isSidebarOpen && (
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Menu Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* User Profile Card */}
      {!isSidebarOpen && (
        <div className="p-4 border-b border-gray-200">
          <div className="rounded-lg p-3 bg-gradient-to-r from-teal-50 to-teal-100 border border-teal-200">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="User"
                  />
                  <AvatarFallback className="bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <p className="font-bold text-sm text-gray-800">John Doe</p>
                <div className="flex items-center gap-2">
                  <span className="inline-block px-2 py-0.5 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full text-white text-xs font-semibold capitalize">
                    {role}
                  </span>
                  <span className="text-xs text-gray-500">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {isSidebarOpen ? (
          // Collapsed view - show only icons
          <div className="space-y-2 px-2 ">
            {menuItems?.map((item, index) => {
              const IconComponent = item.icon;
              const isActive = pathname === item.href;
              return (
                <div key={index} className="space-y-1 rounded-sm ">
                  <Link
                    href={item.href || "#"}
                    className={cn(
                      "flex items-center justify-center p-3 rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-teal-500 text-white shadow-lg "
                        : "text-gray-600 hover:bg-gradient-to-r hover:rounded-lg hover:from-teal-500 hover:to-teal-600 hover:text-white"
                    )}
                    title={item.title}
                  >
                    <IconComponent className="w-5 h-5" />
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          // Expanded view - show full menu
          <ul className="space-y-1  p-2">
            {filteredMenuItems?.map((item, index) => {
              const IconComponent = item.icon;
              const isExpanded = expandedItems.includes(
                item.title.toLowerCase()
              );
              const hasSubItems = item.items && item.items.length > 0;
              const isActive = pathname === item.href;

              return (
                <li key={index}>
                  {/* Main Menu Item */}
                  <div
                    className={cn(
                      "flex items-center justify-between px-4 py-3  rounded text-gray-700 hover:bg-teal-500 hover:text-white cursor-pointer transition-colors duration-200",
                      isExpanded &&
                        hasSubItems &&
                        "bg-teal-50 text-teal-700 rounded",
                      isActive &&
                        !hasSubItems &&
                        "bg-teal-300 text-white rounded"
                    )}
                    onClick={() => {
                      if (hasSubItems) {
                        toggleExpanded(item.title);
                      } else if (item.href) {
                        window.location.href = item.href;
                      }
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                    {hasSubItems && (
                      <ChevronLeft
                        className={cn(
                          "w-4 h-4 transition-transform",
                          isExpanded ? "transform rotate-180" : ""
                        )}
                      />
                    )}
                  </div>

                  {/* Sub Menu Items */}
                  {hasSubItems && isExpanded && (
                    <ul className="bg-teal-50 border-l-2 border-teal-200 ml-4 bg rounded">
                      {item.items?.map((subItem, subIndex) => {
                        const isSubActive = pathname === subItem.href;
                        return (
                          <li key={subIndex}>
                            <Link
                              href={subItem.href}
                              className={cn(
                                "flex items-center  rounded px-8 py-2 text-sm text-gray-600 hover:text-white hover:bg-teal-500 transition-colors duration-200",
                                isSubActive && "text-white bg-teal-500 "
                              )}
                            >
                              <div className="w-2 h-2 bg-teal-500 rounded-full mr-3 "></div>
                              {subItem.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </nav>

      {/* Footer */}
      {!isSidebarOpen && (
        <div className="p-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-400">JobPortal Pro v2.0.0</p>
            <p className="text-[10px] text-gray-300 mt-1">
              © 2024 All Rights Reserved
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
