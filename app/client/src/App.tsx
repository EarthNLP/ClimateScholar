import React, { useEffect, useState } from "react";
import { FullTextSearchBar } from "./Components/SearchBar";
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { SearchResults } from "./Components/SearchResults";
import { useTabs, TabPanel } from "react-headless-tabs";
import { TabSelector } from "./Components/TabSelector";
import { EntitySearch } from "./Components/EntitySearch";
import ky from "ky";

export enum SearchTabs {
  FullText = "Text Search",
  EntitySearch = "Entity Connection Search"
}

export const textSearchResultsAtom = atom({
  key: 'textSearchResults',
  default: [],
});

export const entityConnectionResultsAtom = atom({
  key: 'entityConnectionResultsAtom',
  default: [],
});

export const dbEntitiesAtom = atom({
  key: 'dbEntitiesAtom',
  default: [],
});

export const dbEntitiesSelector = selector({
  key: 'dbEntitiesSelector',
  get: async ({get}) => {
    const response = await ky.get('http://127.0.0.1:8000/get-all-fields').json();
    return (response as any)["ents"];
}});


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

  // Local State
  const [resultsLoaded, setResultsLoaded] = useState<boolean>(false);

  const [selectedTab, setSelectedTab] = useTabs([
    SearchTabs.FullText,
    SearchTabs.EntitySearch
  ]);

  // Recoil State
  const [textSearchResults, setTextSearchResults] = useRecoilState(textSearchResultsAtom);
  const entities = useRecoilValue(dbEntitiesSelector);

  useEffect(() => {
    console.log("Text Search Changed: " + JSON.stringify(textSearchResults));
    
    if (Object.keys(textSearchResults).length >= 1) {
      setResultsLoaded(true);
    }
    
  }, [textSearchResults]);



  return (
      <div className={resultsLoaded ? "results-loaded-app" :"default-app"}>
          <h1>ClimateScholar</h1>
          <>
          <nav className="flex border-b border-gray-300">
            <TabSelector
              isActive={selectedTab === SearchTabs.FullText}
              onClick={() => setSelectedTab(SearchTabs.FullText)}
            >
              {SearchTabs.FullText}
            </TabSelector>
            <TabSelector
              isActive={selectedTab === SearchTabs.EntitySearch}
              onClick={() => setSelectedTab(SearchTabs.EntitySearch)}
            >
              {SearchTabs.EntitySearch}
            </TabSelector>
          </nav>
            <TabPanel hidden={selectedTab !== SearchTabs.FullText}><FullTextSearchBar /></TabPanel>
            <TabPanel hidden={selectedTab !== SearchTabs.EntitySearch}><EntitySearch entities={entities} /></TabPanel>
        </>
          
          {resultsLoaded ? <SearchResults /> : <></>}
      </div>
  );
}

export default App;
