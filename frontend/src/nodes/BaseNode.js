// BaseNode.js
// Shared abstraction for all pipeline nodes — renders the card shell, title,
// connection Handles, and standard fields from declarative props. Custom UI
// can be passed via `children`.

import { useState } from 'react';
import { Handle } from 'reactflow';
import { NODE_ICON } from './nodeIcons';

// Renders one editable field based on its declared `type`.
const FieldRenderer = ({ field, value, onChange }) => {
  if (field.type === 'select') {
    return (
      <label className="field">
        <span className="field_label">{field.label}</span>
        <select className="field_select" value={value} onChange={onChange}>
          {field.options.map((opt) => {
            // options accept either 'Text' or { value, label }
            const o = typeof opt === 'string' ? { value: opt, label: opt } : opt;
            return (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            );
          })}
        </select>
      </label>
    );
  }

  return (
    <label className="field">
      <span className="field_label">{field.label}</span>
      <input
        className="field_input"
        type="text"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

// handles: [{ type, position, id, style? }]  — `id` is the short port name;
//          the full handle id becomes `${nodeId}-${id}`.
// fields:  [{ name, label, type, default, options? }]
export const BaseNode = ({
  id,
  data,
  title,
  handles = [],
  fields = [],
  children,
  style,
}) => {
  // All field values live in one local state object (rule-of-hooks safe).
  const [values, setValues] = useState(() =>
    Object.fromEntries(
      fields.map((field) => [
        field.name,
        data?.[field.name] ?? field.default ?? '',
      ]),
    ),
  );

  const handleChange = (name) => (e) => {
    const { value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // Per-type Lucide icon shown in the header.
  const Icon = NODE_ICON[data?.nodeType];

  return (
    <div className="node" style={style}>
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={handle.style}
        />
      ))}

      <div className="node_header">
        {Icon && <Icon className="node_icon" size={14} strokeWidth={2} />}
        <span>{title}</span>
      </div>

      <div className="node_body">
        {fields.map((field) => (
          <FieldRenderer
            key={field.name}
            field={field}
            value={values[field.name]}
            onChange={handleChange(field.name)}
          />
        ))}
        {children}
      </div>
    </div>
  );
};
