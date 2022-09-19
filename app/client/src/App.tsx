import React, { useState } from "react";
import { SearchBar } from "./Components/SearchBar";

// TODO: Fix the ugly bg issue
/**
 * 
 * @returns 
 */
function App() {
  function toggleDarkMode() {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-700">
      <header className="flex flex-col items-center justify-center flex-grow text-2xl dark:text-white">
        <h1>ClimateScholar</h1>
          <SearchBar />
      </header>
    </div>
  );
}

export default App;
