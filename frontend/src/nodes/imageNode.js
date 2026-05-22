// imageNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

// Standard fields and custom children render together in one node.
export const ImageNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Image"
    handles={[{ type: 'source', position: Position.Right, id: 'image' }]}
    fields={[
      { name: 'prompt', label: 'Prompt', type: 'text', default: 'a red panda' },
    ]}
  >
    <div className="node_preview">preview</div>
  </BaseNode>
);
