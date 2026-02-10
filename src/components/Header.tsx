import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag, Moon, Sun, Menu, X, User } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "SKETCHES AND STORIES", path: "/sketch" },
    { name: "PRODUCTS", path: "/product" },
    { name: "RESEARCHES", path: "/research" },
    { name: "ABOUT", path: "/about" },
  ];

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="brand-logo text-2xl font-bold text-foreground">
            Hendy Fatchurohman
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ||
                  (item.path === "/product" && location.pathname.startsWith("/product")) ||
                  (item.path === "/sketch" && location.pathname.startsWith("/sketch"))
                  ? "nav-link-active"
                  : ""
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/product" className="p-2 hover:bg-muted rounded-full transition-colors">
              <ShoppingBag className="w-4 h-4" />
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <a href="http://127.0.0.1:8000/admin/login" className="p-2 hover:bg-muted rounded-full transition-colors">
              <User className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border p-6 shadow-lg animate-in slide-in-from-top-2 z-40">
          <nav className="flex flex-col gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link text-center text-sm ${location.pathname === item.path ? "nav-link-active" : ""
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center justify-center gap-6 pt-4 border-t border-border mt-2">
              <button className="p-2 hover:bg-muted rounded-full transition-colors">
                <ShoppingBag className="w-5 h-5" />
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <a href="http://127.0.0.1:8000/admin/login" className="p-2 hover:bg-muted rounded-full transition-colors">
                <User className="w-5 h-5" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;