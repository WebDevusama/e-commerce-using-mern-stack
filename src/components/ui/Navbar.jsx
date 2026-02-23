import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LanguageIcon from "@mui/icons-material/Language";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedDarkMode);
    document.body.classList.toggle("dark", savedDarkMode);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    document.body.classList.toggle("dark", newMode);
  };

  const toggleLanguage = () => {
    setLanguage(language === "EN" ? "ES" : "EN");
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(
        `/search?q=${encodeURIComponent(searchQuery)}&category=${selectedCategory}`
      );
      setIsMenuOpen(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="brand" onClick={() => navigate("/")}>
          Brand
        </div>
      </div>

      <div className="navbar-center">
        <input
          type="text"
          placeholder="Search products..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <select
          className="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="books">Books</option>
        </select>

        <button type="button" className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>








      <div className="navbar-right">
        <div className="nav-item" onClick={() => navigate("/dashboard")}>
          <DashboardIcon className="icon" />
          <span>Dashboard</span>
        </div>

      

        <div className="nav-item" onClick={toggleDarkMode}>
          {isDarkMode ? (
            <LightModeIcon className="icon" />
          ) : (
            <DarkModeIcon className="icon" />
          )}
          <span>{isDarkMode ? "Light" : "Dark"}</span>
        </div>

        <div className="nav-item" onClick={() => navigate("/location")}>
          <LocationOnIcon className="icon" />
          <span>Location</span>
        </div>

        <div className="nav-item" onClick={() => navigate("/orders")}>
          <FavoriteIcon className="icon" />
          <span>Orders</span>
        </div>

        <div className="nav-item" onClick={() => navigate("/payments")}>
          <CreditCardIcon className="icon" />
          <span>Payments</span>
        </div>

        <div className="nav-item cart" onClick={() => navigate("/cart")} role="button">
          <ShoppingCartIcon className="icon" />
          <span>Cart</span>
        </div>

        <button
          className="nav-item mobile-menu-toggle"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <CloseIcon className="icon" /> : <MenuIcon className="icon" />}
          <span className="mobile-menu-label">Menu</span>
        </button>
      </div>

      {isMenuOpen && (
        <>
          <div
            className="mobile-menu-backdrop"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          <nav id="mobile-menu" className="mobile-menu active" role="menu">
            <div
              className="nav-item"
              onClick={() => {
                navigate("/dashboard");
                setIsMenuOpen(false);
              }}
            >
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </div>
            <div
              className="nav-item"
              onClick={() => {
                toggleLanguage();
                setIsMenuOpen(false);
              }}
            >
              <LanguageIcon className="icon" />
              <span>{language}</span>
            </div>
            <div
              className="nav-item"
              onClick={() => {
                toggleDarkMode();
                setIsMenuOpen(false);
              }}
            >
              {isDarkMode ? (
                <LightModeIcon className="icon" />
              ) : (
                <DarkModeIcon className="icon" />
              )}
              <span>{isDarkMode ? "Light" : "Dark"}</span>
            </div>
            <div
              className="nav-item"
              onClick={() => {
                navigate("/location");
                setIsMenuOpen(false);
              }}
            >
              <LocationOnIcon className="icon" />
              <span>Location</span>
            </div>
            <div
              className="nav-item"
              onClick={() => {
                navigate("/orders");
                setIsMenuOpen(false);
              }}
            >
              <FavoriteIcon className="icon" />
              <span>Orders</span>
            </div>
            <div
              className="nav-item"
              onClick={() => {
                navigate("/payments");
                setIsMenuOpen(false);
              }}
            >
              <CreditCardIcon className="icon" />
              <span>Payments</span>
            </div>
            <div
              className="nav-item"
              onClick={() => {
                navigate("/cart");
                setIsMenuOpen(false);
              }}
            >
              <ShoppingCartIcon className="icon" />
              <span>Cart</span>
            </div>
          </nav>
        </>
      )}
    </div>
  );
};

export default Navbar;
