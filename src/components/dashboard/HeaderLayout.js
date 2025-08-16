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
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import Link from "next/link";

const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { data: session, status } = useSession();
  const user = session?.user;
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

  // Get user role and determine profile path
  const getUserRole = () => {
    if (user?.userType) {
      return user.userType.toLowerCase();
    }
    // Fallback based on email or default
    return "user";
  };

  const getProfilePath = () => {
    const role = getUserRole();
    switch (role) {
      case "client":
        return "/dashboard/client/profile";
      case "admin":
        return "/dashboard/admin/profile";
      case "vendor":
        return "/dashboard/vendor/profile";
      default:
        return "/dashboard/user/profile";
    }
  };

  const getSettingsPath = () => {
    const role = getUserRole();
    switch (role) {
      case "client":
        return "/dashboard/client/settings";
      case "admin":
        return "/dashboard/admin/settings";
      case "vendor":
        return "/dashboard/vendor/settings";
      default:
        return "/dashboard/user/settings";
    }
  };

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
            onClick={() => window.location.reload()}
            className="text-teal-600 border-teal-200 hover:bg-teal-50 bg-transparent transition-colors duration-200"
          >
            <RotateCcw className="w-4 h-4 mr-2 text-teal-700" />
            Refresh {user?.name ? `(${user.name})` : ""}
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

          {/* Profile Dropdown */}
          {status === "loading" ? (
            <div className="h-10 w-32 bg-gray-200 animate-pulse rounded-full"></div>
          ) : session ? (
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
                      src={user?.image || "/placeholder.svg?height=32&width=32"}
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback className="bg-teal-500 text-white">
                      {user?.name
                        ? user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .substring(0, 2)
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left hidden sm:block">
                    <p className="text-sm font-medium text-gray-900 truncate max-w-24">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {getUserRole()}
                    </p>
                  </div>
                </div>
              </Button>

              {isProfileMenuOpen && (
                <div
                  className={cn(
                    "absolute right-0 mt-2 w-56 rounded-md border bg-white p-1 text-popover-foreground shadow-xl z-50",
                    "origin-top-right animate-in fade-in-0 zoom-in-95"
                  )}
                >
                  {/* User Info Header */}
                  <div className="px-2 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </p>
                    <p className="text-xs text-teal-600 capitalize font-medium">
                      {getUserRole()} Account
                    </p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <Link href={getProfilePath()}>
                      <button
                        className="flex w-full items-center rounded-sm px-2 py-2 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>My Profile</span>
                      </button>
                    </Link>
                    <Link href={getSettingsPath()}>
                      <button
                        className="flex w-full items-center rounded-sm px-2 py-2 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </button>
                    </Link>
                  </div>

                  <div className="my-1 h-px bg-gray-200 -mx-1" />

                  {/* Sign Out */}
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="flex w-full items-center rounded-sm px-2 py-2 text-sm outline-none transition-colors hover:bg-red-50 hover:text-red-600 focus:bg-red-50 focus:text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/signIn">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
