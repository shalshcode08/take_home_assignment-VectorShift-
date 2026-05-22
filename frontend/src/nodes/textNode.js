// textNode.js

import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const TextNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Text"
    handles={[{ type: "source", position: Position.Right, id: "output" }]}
    fields={[
      { name: "text", label: "Text", type: "text", default: "{{input}}" },
    ]}
  />
);
