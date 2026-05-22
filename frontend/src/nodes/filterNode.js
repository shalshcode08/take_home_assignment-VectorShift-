// filterNode.js

import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const FilterNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Filter"
    handles={[
      { type: "target", position: Position.Left, id: "input" },
      { type: "source", position: Position.Right, id: "output" },
    ]}
    fields={[
      {
        name: "condition",
        label: "Keep if",
        type: "text",
        default: "value > 0",
      },
    ]}
  />
);
