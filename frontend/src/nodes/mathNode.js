// mathNode.js

import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const MathNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Math"
    handles={[
      {
        type: "target",
        position: Position.Left,
        id: "a",
        style: { top: `${100 / 3}%` },
      },
      {
        type: "target",
        position: Position.Left,
        id: "b",
        style: { top: `${200 / 3}%` },
      },
      { type: "source", position: Position.Right, id: "result" },
    ]}
    fields={[
      {
        name: "operation",
        label: "Operation",
        type: "select",
        options: ["Add", "Subtract", "Multiply", "Divide"],
        default: "Add",
      },
    ]}
  />
);
