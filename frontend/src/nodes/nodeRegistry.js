import { InputNode } from "./inputNode";
import { LLMNode } from "./llmNode";
import { OutputNode } from "./outputNode";
import { TextNode } from "./textNode";
import { FilterNode } from "./filterNode";
import { MathNode } from "./mathNode";
import { ApiNode } from "./apiNode";
import { NoteNode } from "./noteNode";
import { ImageNode } from "./imageNode";

export const NodeType = {
  INPUT: "customInput",
  LLM: "llm",
  OUTPUT: "customOutput",
  TEXT: "text",
  FILTER: "filter",
  MATH: "math",
  API: "api",
  NOTE: "note",
  IMAGE: "image",
};

export const NODES = [
  { type: NodeType.INPUT, label: "Input", component: InputNode },
  { type: NodeType.LLM, label: "LLM", component: LLMNode },
  { type: NodeType.OUTPUT, label: "Output", component: OutputNode },
  { type: NodeType.TEXT, label: "Text", component: TextNode },
  { type: NodeType.FILTER, label: "Filter", component: FilterNode },
  { type: NodeType.MATH, label: "Math", component: MathNode },
  { type: NodeType.API, label: "API", component: ApiNode },
  { type: NodeType.NOTE, label: "Note", component: NoteNode },
  { type: NodeType.IMAGE, label: "Image", component: ImageNode },
];

export const nodeTypes = Object.fromEntries(
  NODES.map((node) => [node.type, node.component]),
);
