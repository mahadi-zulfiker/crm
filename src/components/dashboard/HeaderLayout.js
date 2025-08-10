"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  RotateCcw,
  Fullscreen,
  Minimize2,
  ListCollapse,
  AlignLeft,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils"; // Import cn utility

const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error trying to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const { data: session, status } = useSession();
  const user = session?.user;

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 transition-colors duration-200"
          >
            {isSidebarOpen ? (
              <ListCollapse className="w-8 h-8 text-teal-700" />
            ) : (
              <AlignLeft className="w-8 h-8 text-teal-700" />
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-teal-600 border-teal-200 hover:bg-teal-50 bg-transparent transition-colors duration-200"
          >
            <RotateCcw className="w-4 h-4 mr-2 text-teal-700" />
            Cache clear {user?.name}
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            className="transition-colors duration-200"
          >
            {isFullscreen ? (
              <Minimize2 className="w-8 h-8 text-teal-700" />
            ) : (
              <Fullscreen className="w-8 h-8 text-teal-700" />
            )}
          </Button>

          {/* Custom Profile Dropdown */}
          <div className="relative" ref={profileMenuRef}>
            <Button
              variant="ghost"
              className="relative h-10 w-auto px-3 rounded-full bg-teal-50 hover:bg-teal-100 transition-colors duration-200"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              aria-expanded={isProfileMenuOpen}
              aria-haspopup="true"
            >
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="Admin"
                  />
                  <AvatarFallback className="bg-teal-500 text-white">
                    {user?.name
                      ? user.name.substring(0, 2).toUpperCase()
                      : "SD"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.role || "user"}
                  </p>
                </div>
              </div>
            </Button>

            {isProfileMenuOpen && (
              <div
                className={cn(
                  "absolute right-0 mt-2 w-56 rounded-md border bg-white p-1 text-popover-foreground shadow-xl",
                  "origin-top-right animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
                )}
              >
                <button className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </button>
                <button className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </button>
                <div className="my-1 h-px bg-muted -mx-1" /> {/* Separator */}
                <button className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-destructive hover:text-destructive-foreground focus:bg-destructive focus:text-destructive-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
