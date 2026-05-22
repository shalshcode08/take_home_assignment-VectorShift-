// outputNode.js

import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const OutputNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Output"
    handles={[{ type: "target", position: Position.Left, id: "value" }]}
    fields={[
      {
        name: "outputName",
        label: "Name",
        type: "text",
        default: id.replace("customOutput-", "output_"),
      },
      {
        name: "outputType",
        label: "Type",
        type: "select",
        options: ["Text", "Image"],
        default: "Text",
      },
    ]}
  />
);
