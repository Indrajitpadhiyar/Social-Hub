import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom"; // 👈 Added

const mockChats = [
  { id: 1, name: "Alice", lastMessage: "See you soon!", avatar: "A" },
  { id: 2, name: "Bob", lastMessage: "How's it going?", avatar: "B" },
  { id: 3, name: "Charlie", lastMessage: "Let's catch up!", avatar: "C" },
];

const mockMessages = {
  1: [
    { fromMe: false, text: "Hey!" },
    { fromMe: true, text: "Hi Alice!" },
    { fromMe: false, text: "See you soon!" },
  ],
  2: [
    { fromMe: false, text: "How's it going?" },
    { fromMe: true, text: "All good, Bob!" },
  ],
  3: [
    { fromMe: false, text: "Let's catch up!" },
    { fromMe: true, text: "Sure, Charlie!" },
  ],
};

export default function Chat() {
  const navigate = useNavigate(); // 👈 Used for redirect
  const [selectedChat, setSelectedChat] = useState(1);
  const [messages, setMessages] = useState(mockMessages[selectedChat]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(mockMessages[selectedChat]);
  }, [selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMsg = { fromMe: true, text: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  return (
    <div className="relative flex h-[90vh] w-full mx-auto rounded-lg overflow-hidden shadow-lg bg-background border mt-4">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:w-1/3 lg:w-1/4 bg-card border-r flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-bold">Chats</h2>
          {/* Exit Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")} // 👈 Redirect here
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
        <ScrollArea className="flex-1">
          {mockChats.map((chat) => (
            <div
              key={chat.id}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-accent transition ${
                selectedChat === chat.id ? "bg-accent/50" : ""
              }`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <Avatar>
                <AvatarFallback>{chat.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">{chat.name}</div>
                <div className="text-xs text-muted-foreground truncate max-w-[120px]">
                  {chat.lastMessage}
                </div>
              </div>
              {selectedChat === chat.id && (
                <Badge variant="secondary">Active</Badge>
              )}
            </div>
          ))}
        </ScrollArea>
      </aside>

      {/* Sidebar - Mobile (Slide-in) */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r flex flex-col md:hidden"
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-bold">Chats</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <ScrollArea className="flex-1">
              {mockChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-accent transition ${
                    selectedChat === chat.id ? "bg-accent/50" : ""
                  }`}
                  onClick={() => {
                    setSelectedChat(chat.id);
                    setSidebarOpen(false);
                  }}
                >
                  <Avatar>
                    <AvatarFallback>{chat.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{chat.name}</div>
                    <div className="text-xs text-muted-foreground truncate max-w-[120px]">
                      {chat.lastMessage}
                    </div>
                  </div>
                  {selectedChat === chat.id && (
                    <Badge variant="secondary">Active</Badge>
                  )}
                </div>
              ))}
            </ScrollArea>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col">
        <Card className="flex-1 flex flex-col rounded-none shadow-none border-0">
          {/* Header */}
          <CardHeader className="flex-row items-center gap-4 border-b justify-between">
            <div className="flex items-center gap-4">
              {/* Hamburger (Mobile) */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>

              <Avatar>
                <AvatarFallback>
                  {mockChats[selectedChat - 1].avatar}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-lg">
                {mockChats[selectedChat - 1].name}
              </CardTitle>
            </div>

            {/* Exit Button (Top Right) */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")} // 👈 Redirect here
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 bg-background">
            <div className="flex flex-col gap-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.fromMe ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] sm:max-w-xs px-4 py-2 rounded-lg text-sm shadow-md ${
                      msg.fromMe
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          {/* Input */}
          <CardFooter className="border-t bg-card p-2 sm:p-4">
            <form onSubmit={handleSend} className="flex w-full gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button
                type="submit"
                variant="default"
                className="px-4 sm:px-6 whitespace-nowrap"
              >
                Send
              </Button>
            </form>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
