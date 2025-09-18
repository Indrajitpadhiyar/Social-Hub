import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MessageCircle,
  Music,
  Video,
  Gamepad2,
  Palette,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import Footer from "./Footer";

// Counter Component
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2000,
  suffix = "",
}) => {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const end = value;

    // 👇 speed adjust logic
    const finalDuration = value >= 100 ? 3000 : duration;
    const stepTime = Math.max(Math.floor(finalDuration / end), 20);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

// Main Hero Section
const HeroSection = () => {
  const token = localStorage.getItem("token");

  const features = [
    {
      icon: MessageCircle,
      title: "Real-time Chat",
      description:
        "Connect instantly with friends through text, emojis, and media sharing",
    },
    {
      icon: Music,
      title: "Music Streaming",
      description:
        "Stream your favorite songs together with synchronized playback",
    },
    {
      icon: Video,
      title: "Movie Nights",
      description:
        "Watch movies together in sync during video calls with friends",
    },
    {
      icon: Gamepad2,
      title: "Multiplayer Games",
      description:
        "Play AI-generated mini-games in 1v1 or 2v2 multiplayer modes",
    },
    {
      icon: Palette,
      title: "Collaborative Drawing",
      description:
        "Create art together on a shared digital whiteboard in real-time",
    },
    {
      icon: Users,
      title: "Friends Network",
      description:
        "Build your social circle with friend requests and online status",
    },
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "50M+", label: "Messages Sent" },
    { number: "1M+", label: "Hours Streamed" },
    { number: "99.9%", label: "Uptime" },
  ];

  const parseNumber = (str: string) => {
    const suffix = str.replace(/[0-9.]/g, "");
    const numeric = parseFloat(str.replace(/[^0-9.]/g, ""));
    return { numeric, suffix };
  };

  return (
    <div className="min-h-screen particles-bg relative overflow-hidden">
      {/* Hero Background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Main Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Hero Text */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Welcome to the Future of Social
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Connect. Create.
            </span>
            <br />
            <span className="text-foreground">Share Everything.</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up">
            Experience the ultimate social platform where you can chat, listen
            to music, watch movies, play games, and create art together with
            friends in real-time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up">
            <Button
              size="lg"
              variant="hero"
              className="text-lg px-8 py-3"
              asChild
            >
              <Link to={`${token ? "/dashboard" : "/register"}`}>
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="glass" className="text-lg px-8 py-3">
              Learn More
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="glass hover-lift p-6 border-primary/10 animate-fade-in-up hover:cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-primary p-3 rounded-xl shadow-primary">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => {
            const { numeric, suffix } = parseNumber(stat.number);
            return (
              <div
                key={stat.label}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1 + 0.6}s` }}
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  <AnimatedCounter value={numeric} suffix={suffix} />
                </div>
                <div className="text-muted-foreground text-sm">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HeroSection;
