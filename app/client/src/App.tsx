import React, { useState } from "react";
import { FullTextSearchBar } from "./Components/SearchBar";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import ky from 'ky';

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
    <RecoilRoot>
      <div className="app">
          <h1>ClimateScholar</h1>
            <FullTextSearchBar />
      </div>
    </RecoilRoot>
  );
}

export default App;
