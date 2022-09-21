import React from "react";
import { SearchTabs } from "../App";
import { FullTextResults } from "./FullTextResults";

interface ISearchResults {
    searchTab: SearchTabs
}

/**
 * 
 * @param props 
 * @returns 
 */
export function SearchResults(props: ISearchResults): JSX.Element {
    return (
        <div>
            {props.searchTab === SearchTabs.FullText ? <FullTextResults/> : <></>}
        </div>
    );
}