import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, 
  Music, 
  Video, 
  Gamepad2, 
  Palette, 
  Users, 
  Settings,
  Menu,
  X
} from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: MessageCircle, label: "Chat", path: "/chat" },
    { icon: Music, label: "Music", path: "/music" },
    { icon: Video, label: "Movies", path: "/movies" },
    { icon: Gamepad2, label: "Games", path: "/games" },
    { icon: Palette, label: "Draw", path: "/draw" },
    { icon: Users, label: "Friends", path: "/friends" },
  ];

  return (
    <nav className="glass border-b border-border/50 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg shadow-glow" />
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SocialHub
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.path}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              );
            })}
          </div>

          {/* User Menu & Settings */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="hover-scale">
              <img src="/favicon.ico" alt="" />
            </Button>
            
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/30">
            <div className="grid grid-cols-2 gap-2 mt-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.path}
                    variant="ghost"
                    className="justify-start h-12 glass"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;