import React, { useEffect, useState } from "react";
import { FullTextSearchBar } from "./Components/SearchBar";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { SearchResults } from "./Components/SearchResults";

export const textSearchResultsAtom = atom({
  key: 'textSearchResults',
  default: [],
});

/**
 * 
 * @returns 
 */
function App(): JSX.Element {
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

  const [textSearchResults, setTextSearchResults] = useRecoilState(textSearchResultsAtom);
  const [resultsLoaded, setResultsLoaded] = useState<boolean>(false);

  useEffect(() => {
    console.log("Text Search Changed: " + JSON.stringify(textSearchResults));
    
    if (Object.keys(textSearchResults).length >= 1) {
      setResultsLoaded(true);
    }
    
  }, [textSearchResults]);



  return (
      <div className={resultsLoaded ? "results-loaded-app" :"default-app"}>
          <h1>ClimateScholar</h1>
            <FullTextSearchBar />
            {resultsLoaded ? <SearchResults /> : <></>}
      </div>
  );
}

export default App;
