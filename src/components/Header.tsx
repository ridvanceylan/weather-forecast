// components/Header.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import { ThemeSwitcher } from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";

const Header: React.FC = () => {
  const location = useLocation();

  if (location.pathname !== "/") {
    return null;
  }

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800">
      <ThemeSwitcher />
      <LanguageSwitcher />
    </header>
  );
};

export default Header;
