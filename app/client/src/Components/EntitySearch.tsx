import * as React from "react";
import { Dropdown } from "azure-devops-ui/Dropdown";
import { DropdownSelection } from "azure-devops-ui/Utilities/DropdownSelection";
import { dropdownItems } from "./Data";
import { useRef } from "react";
import { Button } from "azure-devops-ui/Button";

interface IEntitySearchProps {
    entities: string[]
}

export function EntitySearch(props: IEntitySearchProps) {
  const entity1Selection = useRef(new DropdownSelection());
  const entity2Selection = useRef(new DropdownSelection());

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
        onClick={() => alert("entity1: " + entity1Selection.current.value + " and entity2: " + entity2Selection.current.value)}
      />
    </div>
  );
}
