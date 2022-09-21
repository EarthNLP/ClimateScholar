import * as React from "react";
import { Dropdown } from "azure-devops-ui/Dropdown";
import { DropdownSelection } from "azure-devops-ui/Utilities/DropdownSelection";
import { dropdownItems } from "./Data";
import { useRef } from "react";
import { Button } from "azure-devops-ui/Button";
import ky from "ky";
import { useRecoilState } from "recoil";
import { entityConnectionResultsAtom } from "../App";

interface IEntitySearchProps {
    entities: string[]
}

export function EntitySearch(props: IEntitySearchProps) {
  const entity1Selection = useRef(new DropdownSelection());
  const entity2Selection = useRef(new DropdownSelection());
  const [entityConnectionResults, setEntityConnectionResultsAtom] = useRecoilState(entityConnectionResultsAtom);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 25,
        alignContent: "center"
      }}
    >
      <Dropdown
        ariaLabel="First Entity Single select"
        className="example-dropdown"
        placeholder="Select an entity"
        items={props.entities}
        selection={entity1Selection.current}
      />
      <Dropdown
        ariaLabel="Second Entity Single select"
        className="example-dropdown"
        placeholder="Select an entity"
        items={props.entities}
        selection={entity2Selection.current}
      />
      <Button
        ariaLabel="Entity Search"
        text="Search"
        primary={true}
        onClick={async() => {
          // TODO: Data validation
          const ent1 = props.entities[entity1Selection.current.value[0].beginIndex];
          const ent2 = props.entities[entity2Selection.current.value[0].beginIndex];

          const json = await ky.post('http://127.0.0.1:8000/ent-search', {json: {entity1: ent1, entity2: ent2}}).json();
          console.log("ent-search: " + JSON.stringify(json));
          setEntityConnectionResultsAtom(json["results"] as never[]);
        }}
      />
    </div>
  );
}
