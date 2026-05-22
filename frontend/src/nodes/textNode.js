// textNode.js

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Position, useUpdateNodeInternals } from "reactflow";
import { BaseNode } from "./BaseNode";

const VARIABLE_REGEX = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;

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

  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_HEIGHT)}px`;
    el.style.overflowY = el.scrollHeight > MAX_HEIGHT ? "auto" : "hidden";
  }, [text]);

  const handles = [
    ...variables.map((name, index) => ({
      type: "target",
      position: Position.Left,
      id: name,
      style: {
        top: `calc(36px + (100% - 36px) * ${
          (index + 1) / (variables.length + 1)
        })`,
      },
    })),
    { type: "source", position: Position.Right, id: "output" },
  ];

  const longestLine = text
    .split("\n")
    .reduce((max, line) => Math.max(max, line.length), 0);
  const width = Math.min(Math.max(MIN_WIDTH, longestLine * 7 + 46), MAX_WIDTH);

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
