import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { ForceGraph2D } from 'react-force-graph';
import { useRecoilValue } from 'recoil';
import { entityConnectionResultsAtom } from '../App';
import { CardResult } from './CardResult';
import { ErrorBoundary } from './ErrorBoundary';

export function EntityGraphResults(): JSX.Element {
    const entityNodes = useRecoilValue(entityConnectionResultsAtom);
    console.log("Component mounted with entityNode length of: " + JSON.stringify(entityNodes));

    const width = 800
    const height = 800
    const positionedData = []
    
    entityNodes["flatList"].forEach((node) => {
        positionedData.push({
            ...node,
            position: {
                x: Math.floor(Math.random() * width),
                y: Math.floor(Math.random() * height)
            }
        })
    })
    return <div>
        {/* {(entityNodes as any)["flatList"].map((result: { [x: string]: { [x: string]: string; }; }) => <CardResult title={result["data"]["label"]} abstract={""} />)} */}
        <ErrorBoundary>
            <div className='graph-container' style={ { width: '800px', height: '800px' } }>
                <CytoscapeComponent elements={JSON.parse(JSON.stringify(positionedData))} style={ { width: '800px', height: '800px' } } />;
            </div>
            
        </ErrorBoundary>
        {/* <ErrorBoundary>
            <ForceGraph2D graphData={{"nodes": JSON.parse(JSON.stringify(entityNodes["nodes"])), "links": JSON.parse(JSON.stringify(entityNodes["links"]))}} />
        </ErrorBoundary> */}
    </div>;
  }