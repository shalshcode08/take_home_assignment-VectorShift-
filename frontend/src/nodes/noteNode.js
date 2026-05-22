// noteNode.js

import { BaseNode } from "./BaseNode";

export const NoteNode = ({ id, data }) => (
  <BaseNode id={id} data={data} title="Note">
    <p className="node__note">Leave a comment on your pipeline.</p>
  </BaseNode>
);
