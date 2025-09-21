import { Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

import {
  MessageCircle,
  Music,
  Video,
  Gamepad2,
  Palette,
  Users,
  Play,
  Plus,
  Clock,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showHeader, setShowHeader] = useState(true);
  const quickActions = [
    {
      icon: MessageCircle,
      label: "Start Chat",
      color: "bg-blue-500",
      count: "3 new",
      route: "/chat",
    },
    {
      icon: Music,
      label: "Play Music",
      color: "bg-green-500",
      count: "Spotify",
      route: "/music",
    },
    {
      icon: Video,
      label: "Movie Night",
      color: "bg-red-500",
      count: "Invite",
      route: "/movies",
    },
    {
      icon: Gamepad2,
      label: "Quick Game",
      color: "bg-purple-500",
      count: "1v1",
      route: "/games",
    },
    {
      icon: Palette,
      label: "Draw Together",
      color: "bg-pink-500",
      count: "Live",
      route: "/draw",
    },
    {
      icon: Users,
      label: "Friends",
      color: "bg-cyan-500",
      count: "5 online",
      route: "/friends",
    },
  ];

  const recentActivity = [
    {
      user: "Alex",
      action: "started a music session",
      time: "2m ago",
      type: "music",
    },
    {
      user: "Sarah",
      action: "invited you to watch a movie",
      time: "5m ago",
      type: "movie",
    },
    {
      user: "Mike",
      action: "challenged you to a game",
      time: "10m ago",
      type: "game",
    },
    { user: "Emma", action: "shared a drawing", time: "15m ago", type: "art" },
  ];

  const onlineFriends = [
    {
      name: "Alex Johnson",
      status: "Listening to music",
      avatar: "bg-blue-500",
    },
    { name: "Sarah Wilson", status: "In a video call", avatar: "bg-green-500" },
    { name: "Mike Chen", status: "Playing games", avatar: "bg-purple-500" },
    { name: "Emma Davis", status: "Drawing", avatar: "bg-pink-500" },
    { name: "James Brown", status: "Available", avatar: "bg-cyan-500" },
  ];
  useEffect(() => {
    // 0.5s ke delay ke baad header hide hoga
    const timer = setTimeout(() => {
      setShowHeader(false);
    }, 2000); // 2s ke liye header dikhayega, phir hide hoga

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Welcome Header */}
      {showHeader && (
        <div
          className={`glass rounded-2xl p-6 bg-gradient-primary transition-all duration-700 ease-in-out
            ${
              showHeader
                ? "translate-y-0 opacity-100 duration-1000"
                : "-translate-y-full opacity-0 duration-100"
            }
          `}
        >
          <h1 className="text-3xl font-bold text-primary-foreground mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-primary-foreground/80">
            Ready to connect and create amazing experiences with your friends?
          </p>
        </div>
      )}
      {/* Quick Actions Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Zap className="w-6 h-6 mr-2 text-primary" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card
                onClick={() => navigate(action.route)}
                key={action.label}
                className="glass hover-lift p-6 text-center group"
              >
                <div
                  className={`w-12 h-12 ${action.color} rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{action.label}</h3>
                <Badge variant="secondary" className="text-xs">
                  {action.count}
                </Badge>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Clock className="w-6 h-6 mr-2 text-primary" />
            Recent Activity
          </h2>
          <Card className="glass p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 hover:bg-secondary/20 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary-foreground">
                        {activity.user[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">
                        <span className="text-primary">{activity.user}</span>{" "}
                        {activity.action}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="hover-scale">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 glass">
              View All Activity
            </Button>
          </Card>
        </div>

        {/* Online Friends */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center justify-between">
            <span className="flex items-center">
              <Users className="w-6 h-6 mr-2 text-primary" />
              Friends
            </span>
            <Badge className="bg-green-500">
              {onlineFriends.length} online
            </Badge>
          </h2>
          <Card className="glass p-6">
            <div className="space-y-3">
              {onlineFriends.map((friend, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-2 hover:bg-secondary/20 rounded-lg transition-colors"
                >
                  <div
                    className={`w-10 h-10 ${friend.avatar} rounded-full flex items-center justify-center relative`}
                  >
                    <span className="text-sm font-bold text-white">
                      {friend.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {friend.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {friend.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 glass">
              <Plus className="w-4 h-4 mr-2" />
              Add Friends
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
