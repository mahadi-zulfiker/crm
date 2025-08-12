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
import { Send, Paperclip, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios"; // Import axios for fetching vendor data

// Initialize socket connection
const socket = io("https://crm-lemon-eight.vercel.app");

export default function UserMessagesPage() {
  const [vendors, setVendors] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [hasVendorResponded, setHasVendorResponded] = useState(false);
  const messagesEndRef = useRef(null); // Ref for scrolling to the latest message

  // Fetch vendor data from API
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get("/api/vendors");
        setVendors(response.data);
      } catch (error) {
        console.error("Failed to fetch vendors:", error);
      }
    };
    fetchVendors();
  }, []);

  // Socket.IO message handling
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receiveMessage");
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
      };
      socket.emit("sendMessage", newMessage);
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");

      // Automated vendor response only if not responded before
      if (!hasVendorResponded) {
        setTimeout(() => {
          const vendorResponse = {
            sender: selectedVendor.name,
            text: "Thank you for reaching out! How can I assist you?",
            vendorId: selectedVendor.id,
          };
          setMessages((prev) => [...prev, vendorResponse]);
          setHasVendorResponded(true);
        }, 1000);
      }
    }
  };

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
                <div ref={messagesEndRef} /> {/* Scroll anchor */}
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
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500 text-lg">
              <MessageSquare className="w-8 h-8 mr-2" />
              Select a vendor to start chatting.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
