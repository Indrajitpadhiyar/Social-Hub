import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Menu,
  ArrowLeft,
  UserPlus,
  Search,
  Check,
  Sun,
  Moon,
} from "lucide-react";
import axios from "axios";

// Mock API functions to simulate your axios calls
const mockAPI = {
  getCurrentUser: () => Promise.resolve({ data: { _id: "user123" } }),
  getChats: () =>
    Promise.resolve({
      data: [
        {
          _id: "1",
          username: "Alice",
          email: "alice@example.com",
          isFriend: false,
        },
        { _id: "2", username: "Bob", email: "bob@example.com", isFriend: true },
        {
          _id: "3",
          username: "Charlie",
          email: "charlie@example.com",
          isFriend: false,
        },
      ],
    }),
  searchUsers: (query, existingChats = []) => {
    // Combine existing chats with additional users for search
    const allUsers = [
      ...existingChats,
      
    ];

    return Promise.resolve({
      data: allUsers.filter(
        (user) =>
          user.username.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
      ),
    });
  },
  getMessages: (chatId) =>
    Promise.resolve({
      data: [
        { senderId: "other", text: "Hello there!" },
        { senderId: "user123", text: "Hi! How are you?", delivered: true },
        { senderId: "other", text: "I'm doing great, thanks!" },
      ],
    }),
  sendMessage: (chatId, message) =>
    Promise.resolve({
      data: { senderId: "user123", text: message.text, delivered: true },
    }),
  addFriend: (friendId) => Promise.resolve({ data: { success: true } }),
  getFriendRequests: () =>
    Promise.resolve({
      data: [
        {
          _id: "req1",
          from: { _id: "7", username: "Grace", email: "grace@example.com" },
        },
        {
          _id: "req2",
          from: { _id: "8", username: "Henry", email: "henry@example.com" },
        },
      ],
    }),
  acceptFriendRequest: (requestId) =>
    Promise.resolve({ data: { success: true } }),
  rejectFriendRequest: (requestId) =>
    Promise.resolve({ data: { success: true } }),
};

export default function Chat() {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedChatInfo, setSelectedChatInfo] = useState(null);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Add friend functionality states
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [addingFriend, setAddingFriend] = useState(null);

  const messagesEndRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    // Apply dark mode class to body for proper styling
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    // Get current user info first
    mockAPI
      .getCurrentUser()
      .then((res) => setCurrentUserId(res.data._id))
      .catch(console.error);

    // Fetch chats/users
    mockAPI
      .getChats()
      .then((res) => {
        // Ensure we always set an array
        const chatData = res.data;
        if (Array.isArray(chatData)) {
          setChats(chatData);
        } else {
          console.error("API returned non-array data:", chatData);
          setChats([]); // Fallback to empty array
        }
      })
      .catch((error) => {
        console.error("Failed to fetch chats:", error);
        setChats([]); // Ensure it's always an array
      });

    // Fetch friend requests
    mockAPI
      .getFriendRequests()
      .then((res) => setFriendRequests(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedChat) {
      setLoading(true);
      // Fetch messages for selected chat
      mockAPI
        .getMessages(selectedChat)
        .then((res) => {
          const messageData = res.data;
          setMessages(Array.isArray(messageData) ? messageData : []);
        })
        .catch((error) => {
          console.error("Failed to fetch messages:", error);
          setMessages([]);
        })
        .finally(() => setLoading(false));
    }
  }, [selectedChat]);

  // Focus search input when add friend modal opens
  useEffect(() => {
    if (showAddFriend && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [showAddFriend]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !selectedChat) return;

    const newMsg = { text: input };
    try {
      const res = await mockAPI.sendMessage(selectedChat, newMsg);
      setMessages((prev) => [...prev, res.data]);
      setInput("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleAddFriend = async (friendId) => {
    setAddingFriend(friendId);
    try {
      // Use axios for the real API call
      await axios.post(
        `/friends/add/${friendId}`,
        {},
        { withCredentials: true }
      );
      console.log("Friend added successfully");

      // Update the chats list to reflect friend status
      setChats((prev) =>
        prev.map((chat) =>
          chat._id === friendId ? { ...chat, isFriend: true } : chat
        )
      );

      // Update search results if any
      setSearchResults((prev) =>
        prev.map((user) =>
          user._id === friendId ? { ...user, isFriend: true } : user
        )
      );
    } catch (error) {
      console.error("Failed to add friend:", error);
      // Fallback to mock API if real API fails
      try {
        await mockAPI.addFriend(friendId);
        console.log("Friend added via mock API");

        // Update the chats list to reflect friend status
        setChats((prev) =>
          prev.map((chat) =>
            chat._id === friendId ? { ...chat, isFriend: true } : chat
          )
        );

        // Update search results if any
        setSearchResults((prev) =>
          prev.map((user) =>
            user._id === friendId ? { ...user, isFriend: true } : user
          )
        );
      } catch (mockError) {
        console.error("Failed to add friend via mock API:", mockError);
      }
    } finally {
      setAddingFriend(null);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    try {
      // Try real API first
      const res = await axios.get(
        `/users/search?q=${encodeURIComponent(query)}`,
        { withCredentials: true }
      );
      // Ensure searchResults is always an array
      setSearchResults(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Real search API failed, falling back to mock:", error);
      // Fallback to mock API if real API fails
      try {
        const mockRes = await mockAPI.searchUsers(query, chats);
        setSearchResults(mockRes.data);
      } catch (mockError) {
        console.error("Mock search also failed:", mockError);
        setSearchResults([]);
      }
    } finally {
      setSearchLoading(false);
    }
  };

  const handleAcceptFriendRequest = async (requestId) => {
    try {
      // Try real API first
      await axios.post(
        `/friends/accept/${requestId}`,
        {},
        { withCredentials: true }
      );
      setFriendRequests((prev) => prev.filter((req) => req._id !== requestId));
      console.log("Friend request accepted");
    } catch (error) {
      console.error("Failed to accept friend request with real API:", error);
      // Fallback to mock API
      try {
        await mockAPI.acceptFriendRequest(requestId);
        setFriendRequests((prev) =>
          prev.filter((req) => req._id !== requestId)
        );
        console.log("Friend request accepted via mock API");
      } catch (mockError) {
        console.error(
          "Failed to accept friend request via mock API:",
          mockError
        );
      }
    }
  };

  const handleRejectFriendRequest = async (requestId) => {
    try {
      // Try real API first
      await axios.post(
        `/friends/reject/${requestId}`,
        {},
        { withCredentials: true }
      );
      setFriendRequests((prev) => prev.filter((req) => req._id !== requestId));
      console.log("Friend request rejected");
    } catch (error) {
      console.error("Failed to reject friend request with real API:", error);
      // Fallback to mock API
      try {
        await mockAPI.rejectFriendRequest(requestId);
        setFriendRequests((prev) =>
          prev.filter((req) => req._id !== requestId)
        );
        console.log("Friend request rejected via mock API");
      } catch (mockError) {
        console.error(
          "Failed to reject friend request via mock API:",
          mockError
        );
      }
    }
  };

  // Search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat._id);
    setSelectedChatInfo(chat);
    setSidebarOpen(false);
  };

  const navigateToDashboard = () => {
    console.log("Navigate to dashboard");
    // You can implement actual navigation here
    // window.location.href = '/dashboard';
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Theme classes for dark mode
  const bgColor = darkMode ? "bg-gray-900" : "bg-white";
  const textColor = darkMode ? "text-white" : "text-gray-900";
  const sidebarBg = darkMode ? "bg-gray-800" : "bg-gray-50";
  const chatAreaBg = darkMode ? "bg-gray-900" : "bg-white";
  const messageBg = darkMode ? "bg-gray-700" : "bg-white";
  const inputBg = darkMode
    ? "bg-gray-700 border-gray-600 text-white"
    : "bg-white border-gray-300";
  const buttonBg = darkMode
    ? "bg-blue-600 hover:bg-blue-700"
    : "bg-blue-500 hover:bg-blue-600";
  const borderColor = darkMode ? "border-gray-700" : "border-gray-200";
  const hoverBg = darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100";
  const activeChatBg = darkMode ? "bg-blue-900" : "bg-blue-50";

  return (
    <div
      className={`relative flex h-[90vh] w-full mx-auto rounded-lg overflow-hidden shadow-lg ${bgColor} ${textColor} border ${borderColor} mt-4`}
    >
      {/* Sidebar - Desktop */}
      <aside
        className={`hidden md:flex md:w-1/3 lg:w-1/4 ${sidebarBg} border-r ${borderColor} flex-col`}
      >
        <div
          className={`p-4 border-b ${borderColor} flex items-center justify-between`}
        >
          <h2 className="text-lg font-bold">Chats</h2>
          <div className="flex gap-2">
            <button
              className={`p-2 ${hoverBg} rounded-md text-blue-600`}
              onClick={() => setShowAddFriend(true)}
              title="Add Friend"
            >
              <UserPlus className="h-5 w-5" />
            </button>
            <button
              className={`p-2 ${hoverBg} rounded-md`}
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button
              className={`p-2 ${hoverBg} rounded-md`}
              onClick={navigateToDashboard}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Friend Requests Section */}
        {friendRequests.length > 0 && (
          <div
            className={`border-b ${borderColor} ${
              darkMode ? "bg-yellow-900" : "bg-yellow-50"
            }`}
          >
            <div className="p-3">
              <h3
                className={`text-sm font-semibold ${
                  darkMode ? "text-yellow-200" : "text-yellow-800"
                } mb-2`}
              >
                Friend Requests
              </h3>
              {friendRequests.map((request) => (
                <div
                  key={request._id}
                  className="flex items-center gap-2 mb-2 last:mb-0"
                >
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm">
                    {request.from.username[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {request.from.username}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleAcceptFriendRequest(request._id)}
                      className="p-1 bg-green-500 text-white rounded hover:bg-green-600"
                      title="Accept"
                    >
                      <Check className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => handleRejectFriendRequest(request._id)}
                      className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                      title="Reject"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {Array.isArray(chats) && chats.length > 0 ? (
            chats.map((chat) => (
              <div
                key={chat._id}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${hoverBg} transition ${
                  selectedChat === chat._id ? activeChatBg : ""
                }`}
                onClick={() => handleChatSelect(chat)}
              >
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                  {chat.username ? chat.username[0].toUpperCase() : "?"}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {chat.username || "Unknown"}
                    </span>
                    {chat.isFriend && (
                      <span
                        className={`px-1.5 py-0.5 text-xs ${
                          darkMode
                            ? "bg-green-800 text-green-200"
                            : "bg-green-100 text-green-700"
                        } rounded`}
                      >
                        Friend
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 truncate max-w-[120px]">
                    {chat.email || "No email"}
                  </div>
                </div>
                {!chat.isFriend && (
                  <button
                    className={`px-3 py-1 text-sm border ${borderColor} rounded-md ${hoverBg} disabled:opacity-50 ${
                      addingFriend === chat._id ? "cursor-not-allowed" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddFriend(chat._id);
                    }}
                    disabled={addingFriend === chat._id}
                    title="Add Friend"
                  >
                    {addingFriend === chat._id ? "Adding..." : "Add"}
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No chats available
            </div>
          )}
        </div>
      </aside>

      {/* Sidebar - Mobile (Slide-in) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <aside
            className={`fixed inset-y-0 left-0 z-50 w-64 ${sidebarBg} border-r ${borderColor} flex flex-col transform transition-transform duration-300`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`p-4 border-b ${borderColor} flex items-center justify-between`}
            >
              <h2 className="text-lg font-bold">Chats</h2>
              <div className="flex gap-2">
                <button
                  className={`p-2 ${hoverBg} rounded-md text-blue-600`}
                  onClick={() => {
                    setShowAddFriend(true);
                    setSidebarOpen(false);
                  }}
                  title="Add Friend"
                >
                  <UserPlus className="h-5 w-5" />
                </button>
                <button
                  className={`p-2 ${hoverBg} rounded-md`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {Array.isArray(chats) && chats.length > 0 ? (
                chats.map((chat) => (
                  <div
                    key={chat._id}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${hoverBg} transition ${
                      selectedChat === chat._id ? activeChatBg : ""
                    }`}
                    onClick={() => handleChatSelect(chat)}
                  >
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                      {chat.username ? chat.username[0].toUpperCase() : "?"}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">
                        {chat.username || "Unknown"}
                      </div>
                      <div className="text-xs text-gray-500 truncate max-w-[120px]">
                        {chat.email || "No email"}
                      </div>
                    </div>
                    {selectedChat === chat._id && (
                      <span
                        className={`px-2 py-1 text-xs ${
                          darkMode
                            ? "bg-blue-800 text-blue-200"
                            : "bg-blue-100 text-blue-800"
                        } rounded`}
                      >
                        Active
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No chats available
                </div>
              )}
            </div>
          </aside>
        </div>
      )}

      {/* Chat Area */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col">
          {!selectedChat ? (
            // Animated placeholder
            <div className="flex flex-1 items-center justify-center text-center p-8">
              <div className="space-y-4">
                <div className="text-6xl animate-bounce">💬</div>
                <p className="text-gray-500 text-lg">
                  Select a chat from the sidebar to start messaging
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <header
                className={`flex items-center gap-4 p-4 border-b ${borderColor} justify-between ${chatAreaBg}`}
              >
                <div className="flex items-center gap-4">
                  <button
                    className={`p-2 ${hoverBg} rounded-md md:hidden`}
                    onClick={() => setSidebarOpen(true)}
                  >
                    <Menu className="h-6 w-6" />
                  </button>

                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    {selectedChatInfo?.username
                      ? selectedChatInfo.username[0].toUpperCase()
                      : "?"}
                  </div>
                  <h1 className="text-lg font-semibold">
                    {selectedChatInfo?.username || "Unknown User"}
                  </h1>
                </div>

                <div className="flex gap-2">
                  <button
                    className={`p-2 ${hoverBg} rounded-md`}
                    onClick={() => setDarkMode(!darkMode)}
                    title={
                      darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                    }
                  >
                    {darkMode ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    className={`p-2 ${hoverBg} rounded-md`}
                    onClick={navigateToDashboard}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                </div>
              </header>

              {/* Messages */}
              <div
                className={`flex-1 overflow-y-auto px-4 sm:px-6 py-4 ${
                  darkMode ? "bg-gray-800" : "bg-gray-50"
                }`}
              >
                {loading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {messages.length > 0 ? (
                      messages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex ${
                            msg.senderId === currentUserId
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[70%] sm:max-w-xs px-4 py-2 rounded-lg text-sm shadow-sm ${
                              msg.senderId === currentUserId
                                ? "bg-blue-500 text-white"
                                : `${messageBg} ${textColor}`
                            }`}
                          >
                            {msg.text}
                            {msg.senderId === currentUserId &&
                              msg.delivered && (
                                <span className="ml-2 text-blue-200">✔✔</span>
                              )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex justify-center items-center h-full text-gray-500">
                        No messages yet. Start the conversation!
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Input */}
              <footer
                className={`border-t ${borderColor} ${chatAreaBg} p-2 sm:p-4`}
              >
                <div className="flex w-full gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend(e)}
                    placeholder="Type a message..."
                    className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${inputBg}`}
                    disabled={loading}
                  />
                  <button
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    className={`px-4 py-2 ${buttonBg} text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Send
                  </button>
                </div>
              </footer>
            </>
          )}
        </div>
      </main>

      {/* Add Friend Modal */}
      {showAddFriend && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className={`w-full max-w-md rounded-lg shadow-xl ${bgColor} ${textColor}`}
          >
            <div
              className={`flex items-center justify-between p-4 border-b ${borderColor}`}
            >
              <h3 className="text-lg font-semibold">Add Friend</h3>
              <button
                onClick={() => {
                  setShowAddFriend(false);
                  setSearchQuery("");
                  setSearchResults([]);
                }}
                className={`p-1 rounded-full ${hoverBg}`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search by username or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border ${borderColor} rounded-md ${inputBg}`}
                />
              </div>

              <div className="mt-4 max-h-60 overflow-y-auto">
                {searchLoading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                  </div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((user) => (
                    <div
                      key={user._id}
                      className={`flex items-center justify-between p-3 rounded-md ${hoverBg}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                          {user.username[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium">{user.username}</div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>

                      {user.isFriend ? (
                        <span
                          className={`px-2 py-1 text-xs ${
                            darkMode
                              ? "bg-green-800 text-green-200"
                              : "bg-green-100 text-green-700"
                          } rounded`}
                        >
                          Friends
                        </span>
                      ) : (
                        <button
                          onClick={() => handleAddFriend(user._id)}
                          disabled={addingFriend === user._id}
                          className={`px-3 py-1 text-sm rounded-md ${
                            addingFriend === user._id
                              ? "bg-gray-300 cursor-not-allowed"
                              : "bg-blue-500 hover:bg-blue-600 text-white"
                          }`}
                        >
                          {addingFriend === user._id
                            ? "Adding..."
                            : "Add Friend"}
                        </button>
                      )}
                    </div>
                  ))
                ) : searchQuery ? (
                  <div className="text-center py-4 text-gray-500">
                    No users found
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    Search for users by username or email
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
