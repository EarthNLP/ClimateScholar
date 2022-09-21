import './css/card.css'

import React from "react";
import { useRecoilState } from "recoil";
import { textSearchResultsAtom } from "../App";
interface ICardResult {
    title: string
    abstract: string
}
/**
 * 
 * @returns 
 */
export function CardResult(props: ICardResult): JSX.Element {
    return (
        <div className="card">
            <h2>{props.title}</h2>
            <p>{props.abstract}</p>
        </div>
    );
}