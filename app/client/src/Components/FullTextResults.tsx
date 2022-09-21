import React from "react";
import { useRecoilState } from "recoil";
import { textSearchResultsAtom } from "../App";
import { CardResult } from "./CardResult";

/**
 * 
 * @returns 
 */
export function FullTextResults(): JSX.Element {

    const [textSearchResults, setTextSearchResults] = useRecoilState(textSearchResultsAtom);

    return (
        <div className="card-list">
            {textSearchResults.map((result) => <CardResult title={result["n"]["title"]} abstract={(result["n"]["abstract"] as string)} />)}
        </div>
    );
}