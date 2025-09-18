import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Music,
  Video,
  Gamepad2,
  Palette,
  Users,
  Github,
  Twitter,
  Instagram,
  Mail,
} from "lucide-react";

const Footer = () => {
  const navigationLinks = [
    { icon: MessageCircle, label: "Chat", path: "/chat" },
    { icon: Music, label: "Music", path: "/music" },
    { icon: Video, label: "Movies", path: "/movies" },
    { icon: Gamepad2, label: "Games", path: "/games" },
    { icon: Palette, label: "Draw", path: "/draw" },
    { icon: Users, label: "Friends", path: "/friends" },
  ];

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
    { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
    { icon: Mail, label: "Email", href: "mailto:hello@socialhub.com" },
  ];

  return (
    <footer className="border-t border-border/30 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg shadow-glow overflow-hidden">
                <img
                  src="/favicon.ico"
                  alt="favicon"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                SocialHub
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Connect, create, and share everything with friends in the ultimate
              social platform.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={social.label}
                    variant="ghost"
                    size="icon"
                    className="hover-scale"
                    asChild
                  >
                    <a href={social.href} aria-label={social.label}>
                      <Icon className="w-4 h-4" />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <div className="space-y-2">
              {navigationLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Button
                    key={link.path}
                    variant="ghost"
                    className="w-full justify-start h-8 text-muted-foreground hover:text-foreground"
                    asChild
                  >
                    <a href={link.path}>
                      <Icon className="w-4 h-4 mr-2" />
                      {link.label}
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <div className="space-y-2">
              {["About", "Blog", "Careers", "Press", "Privacy", "Terms"].map(
                (item) => (
                  <Button
                    key={item}
                    variant="ghost"
                    className="w-full justify-start h-8 text-muted-foreground hover:text-foreground"
                  >
                    {item}
                  </Button>
                )
              )}
            </div>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <div className="space-y-2">
              {[
                "Help Center",
                "Documentation",
                "Contact",
                "Status",
                "Community",
              ].map((item) => (
                <Button
                  key={item}
                  variant="ghost"
                  className="w-full justify-start h-8 text-muted-foreground hover:text-foreground"
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 SocialHub. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              Privacy Policy
            </Button>
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              Terms of Service
            </Button>
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              Cookies
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
