import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { Eye, EyeOff, Mail, Lock, User, Chrome } from "lucide-react";

interface AuthFormProps {
  mode: "login" | "register";
  onModeChange: (mode: "login" | "register") => void;
  onLogin: () => void;
}

const AuthForm = ({ mode, onModeChange, onLogin }: AuthFormProps) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const validateForm = () => {
    if (mode === "register") {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;

    const endpoint = mode === "register" ? "/users/register" : "/users/login";

    axios
      .post(`${import.meta.env.VITE_API_URL}${endpoint}`, formData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        onLogin();
        navigate("/dashboard");
      })
      .catch((error) => {
        setError(error.response?.data?.error || "Something went wrong");
      });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 particles-bg">
      <Card className="w-full max-w-md glass p-8 space-y-6 animate-fade-in-up">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl mx-auto shadow-glow pulse-glow">
            <img
              src="/favicon.ico"
              alt="favicon"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <h1 className="text-2xl font-bold">
            {mode === "login" ? "Welcome Back" : "Join SocialHub"}
          </h1>
          <p className="text-muted-foreground">
            {mode === "login"
              ? "Sign in to continue your journey"
              : "Create your account to get started"}
          </p>
        </div>

        {/* Social Login */}
        <Button
          variant="outline"
          className="w-full glass hover-scale"
          size="lg"
        >
          <Chrome className="w-5 h-5 mr-2" />
          Continue with Google
        </Button>

        <div className="relative">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-sm text-muted-foreground">
            or
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="username" className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Choose a username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className="glass"
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="glass"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center">
              <Lock className="w-4 h-4 mr-2" />
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="glass pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                className="glass"
                required
              />
            </div>
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" variant="hero" className="w-full" size="lg">
            {mode === "login" ? "Sign In" : "Create Account"}
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <Button
              variant="link"
              className="p-0 h-auto text-primary hover:text-primary-glow"
              onClick={() =>
                onModeChange(mode === "login" ? "register" : "login")
              }
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </Button>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AuthForm;
