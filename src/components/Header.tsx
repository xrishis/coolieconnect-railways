import { Train, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

export const Header = ({ onLoginClick, onSignupClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
    onLoginClick?.();
  };

  const handleSignupClick = () => {
    navigate("/login");
    onSignupClick?.();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-lg shadow-primary">
              <Train className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">CoolieConnect</h1>
              <p className="text-xs text-muted-foreground -mt-1">Railway Porter Service</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <Button variant="ghost" onClick={handleLoginClick}>
              Login
            </Button>
            <Button variant="hero" onClick={handleSignupClick}>
              Get Started
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-40 pb-4" : "max-h-0"
        )}>
          <nav className="flex flex-col gap-2 pt-4 border-t border-border">
            <Button variant="ghost" className="justify-start" onClick={handleLoginClick}>
              Login
            </Button>
            <Button variant="hero" className="justify-start" onClick={handleSignupClick}>
              Get Started
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};