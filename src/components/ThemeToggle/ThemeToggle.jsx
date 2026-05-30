import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label="Toggle Theme Mode"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <div className={`icon-container ${isDark ? 'is-dark' : 'is-light'}`}>
        {isDark ? (
          <Sun className="icon sun-icon animate-pulse" size={20} color="#fbbf24" />
        ) : (
          <Moon className="icon moon-icon" size={20} color="#1e3a8a" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
