// toolbar.js

import { DraggableNode } from './draggableNode';
import { NODES } from './nodes/nodeRegistry';
import { NODE_ICON } from './nodes/nodeIcons';

export const PipelineToolbar = () => (
  <div className="toolbar">
    <div className="toolbar__list">
      {NODES.map((node) => (
        <DraggableNode
          key={node.type}
          type={node.type}
          label={node.label}
          Icon={NODE_ICON[node.type]}
        />
      ))}
    </div>
  </div>
);
