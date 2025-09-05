"use client";

import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Paperclip, MessageSquare, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";

// Initialize socket connection
let socket;

export default function Messages() {
  const [vendors, setVendors] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [hasVendorResponded, setHasVendorResponded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Fetch vendor data from API
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        // For now, we'll use mock data since there's no actual vendors API
        // In a real application, you would fetch from an actual API endpoint
        const mockVendors = [
          { id: 1, name: "Vendor One", job: "Recruitment Specialist" },
          { id: 2, name: "Vendor Two", job: "HR Manager" },
          { id: 3, name: "Vendor Three", job: "Talent Acquisition" },
        ];
        setVendors(mockVendors);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch vendors:", error);
        setError("Failed to load vendors");
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  // Initialize socket connection
  useEffect(() => {
    // In a real application, you would connect to your actual socket server
    // socket = io("YOUR_SOCKET_SERVER_URL");

    // For demo purposes, we'll simulate socket behavior
    // Mock socket implementation for demonstration
    socket = {
      on: (event, callback) => {
        // Simulate receiving messages
        if (event === "receiveMessage") {
          // We'll simulate receiving messages in the sendMessage function
        }
      },
      off: (event) => {
        // Cleanup function
      },
      emit: (event, data) => {
        // Simulate sending messages
        if (event === "sendMessage") {
          // We'll handle this in the sendMessage function
        }
      },
    };

    return () => {
      if (socket) {
        socket.off("receiveMessage");
      }
    };
  }, []);

  // Scroll to bottom of messages when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() && selectedVendor) {
      const newMessage = {
        sender: "Client",
        text: message,
        vendorId: selectedVendor.id,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newMessage]);
      setMessage("");

      // Simulate vendor response only if not responded before
      if (!hasVendorResponded) {
        setTimeout(() => {
          const vendorResponse = {
            sender: selectedVendor.name,
            text: "Thank you for reaching out! How can I assist you?",
            vendorId: selectedVendor.id,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, vendorResponse]);
          setHasVendorResponded(true);
        }, 1000);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-teal-600" />
          <p className="text-gray-600 mt-4">Loading messages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg
              className="w-16 h-16 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error Loading Messages
          </h3>
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-sm border-0 h-[calc(100vh-180px)] flex flex-col lg:flex-row">
        {/* Vendor List */}
        <div className="w-full lg:w-1/3 border-r border-gray-200 p-6 flex flex-col">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-xl font-semibold text-gray-900">
              Assigned Vendors
            </CardTitle>
            <CardDescription>
              Select a vendor to start a conversation.
            </CardDescription>
          </CardHeader>
          <div className="flex-1 overflow-y-auto space-y-3">
            {vendors.map((vendor) => (
              <Button
                key={vendor.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start p-4 h-auto rounded-lg transition-colors duration-200",
                  selectedVendor?.id === vendor.id
                    ? "bg-teal-100 text-teal-800 hover:bg-teal-200"
                    : "hover:bg-gray-100 text-gray-800"
                )}
                onClick={() => {
                  setSelectedVendor(vendor);
                  setHasVendorResponded(false);
                }}
              >
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt={vendor.name}
                  />
                  <AvatarFallback className="bg-teal-500 text-white">
                    {vendor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-base font-medium">{vendor.name}</span>
                  <span className="text-sm text-gray-500">{vendor.job}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Chat Section */}
        <div className="w-full lg:w-2/3 p-6 flex flex-col">
          <CardHeader className="p-0 pb-4 border-b border-gray-200">
            <CardTitle className="text-xl font-semibold text-gray-900">
              {selectedVendor
                ? `Chat with ${selectedVendor.name}`
                : "Vendor Chat"}
            </CardTitle>
          </CardHeader>
          {selectedVendor ? (
            <>
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {messages
                  .filter((msg) => msg.vendorId === selectedVendor.id)
                  .map((msg, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex items-end gap-3",
                        msg.sender === "Client"
                          ? "justify-end"
                          : "justify-start"
                      )}
                    >
                      {msg.sender !== "Client" && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src="/placeholder.svg?height=32&width=32"
                            alt={msg.sender}
                          />
                          <AvatarFallback className="bg-gray-200">
                            {msg.sender
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={cn(
                          "p-3 rounded-lg max-w-[70%]",
                          msg.sender === "Client"
                            ? "bg-teal-600 text-white rounded-br-none"
                            : "bg-gray-100 text-gray-800 rounded-bl-none"
                        )}
                      >
                        <p className="font-medium text-sm mb-1">{msg.sender}</p>
                        <p className="text-sm">{msg.text}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {msg.timestamp
                            ? new Date(msg.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : ""}
                        </p>
                      </div>
                      {msg.sender === "Client" && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src="/placeholder.svg?height=32&width=32"
                            alt="You"
                          />
                          <AvatarFallback className="bg-teal-500 text-white">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="mt-4 flex items-center gap-2 border-t border-gray-200 pt-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-teal-600"
                >
                  <Paperclip className="w-5 h-5" />
                </Button>
                <Input
                  type="text"
                  className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                />
                <Button
                  className="bg-teal-600 hover:bg-teal-700"
                  onClick={sendMessage}
                  disabled={!message.trim()}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
              <MessageSquare className="w-16 h-16 mb-4" />
              <p className="text-lg mb-2">Vendor Chat</p>
              <p className="text-center max-w-md">
                Select a vendor from the list to start chatting. You can discuss
                job opportunities, ask questions, or get assistance with your
                applications.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
