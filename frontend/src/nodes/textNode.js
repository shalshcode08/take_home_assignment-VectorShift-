// textNode.js
// The Text node has two extras beyond a standard BaseNode config:
//  1. the textarea (and the node) grow as the user types;
//  2. every {{ variableName }} token adds a left-side target Handle.

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Position, useUpdateNodeInternals } from "reactflow";
import { BaseNode } from "./BaseNode";

// Matches {{ name }} where `name` is a valid JS identifier (optional spaces).
const VARIABLE_REGEX = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;

// Unique variable names, in order of first appearance.
const extractVariables = (text) => {
  const seen = new Set();
  for (const match of text.matchAll(VARIABLE_REGEX)) {
    seen.add(match[1]);
  }
  return [...seen];
};

const MIN_WIDTH = 200;
const MAX_WIDTH = 280;
const MAX_HEIGHT = 160;

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text ?? "{{ input }}");
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  const variables = extractVariables(text);

  // Grow the textarea to fit its content, up to MAX_HEIGHT — then scroll.
  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_HEIGHT)}px`;
    el.style.overflowY = el.scrollHeight > MAX_HEIGHT ? "auto" : "hidden";
  }, [text]);

  // One left-side target handle per variable, plus the output handle.
  const handles = [
    ...variables.map((name, index) => ({
      type: "target",
      position: Position.Left,
      id: name,
      // spread evenly down the body, below the ~36px header
      style: {
        top: `calc(36px + (100% - 36px) * ${
          (index + 1) / (variables.length + 1)
        })`,
      },
    })),
    { type: "source", position: Position.Right, id: "output" },
  ];

  // Width grows with the longest line of text, clamped to a sane range.
  const longestLine = text
    .split("\n")
    .reduce((max, line) => Math.max(max, line.length), 0);
  const width = Math.min(Math.max(MIN_WIDTH, longestLine * 7 + 46), MAX_WIDTH);

  // React Flow must re-measure when handles are added/removed or the node
  // is resized, so edges stay attached to the right spots.
  useEffect(() => {
    updateNodeInternals(id);
  }, [id, text, width, variables.length, updateNodeInternals]);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      handles={handles}
      style={{ width }}
    >
      <label className="field">
        <span className="field_label">Text</span>
        <textarea
          ref={textareaRef}
          className="field_input field_textarea nodrag nowheel"
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </label>
    </BaseNode>
  );
};
