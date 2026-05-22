// apiNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ApiNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="API Request"
    handles={[
      { type: 'target', position: Position.Left, id: 'trigger' },
      { type: 'source', position: Position.Right, id: 'response' },
    ]}
    fields={[
      { name: 'url', label: 'URL', type: 'text', default: 'https://' },
      {
        name: 'method',
        label: 'Method',
        type: 'select',
        options: ['GET', 'POST', 'PUT', 'DELETE'],
        default: 'GET',
      },
    ]}
  />
);
