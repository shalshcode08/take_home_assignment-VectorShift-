// submit.js

import { Send } from "lucide-react";
import { useStore } from "./store";
import { parsePipeline } from "./api";

export const SubmitButton = () => {
  const handleSubmit = async () => {
    const { nodes, edges } = useStore.getState();

    try {
      const { num_nodes, num_edges, is_dag } = await parsePipeline(
        nodes,
        edges,
      );

      alert(
        "Pipeline submitted successfully!\n\n" +
          `Nodes:      ${num_nodes}\n` +
          `Edges:      ${num_edges}\n` +
          `Valid DAG:  ${is_dag ? "Yes ✅" : "No ❌"}`,
      );
    } catch (error) {
      alert(
        "Could not reach the backend.\n\n" +
          `${error.message}\n\n` +
          "Make sure it is running at http://localhost:8000",
      );
    }
  };

  return (
    <div className="submit">
      <button type="button" className="submit_button" onClick={handleSubmit}>
        <Send size={14} strokeWidth={2} />
        Submit
      </button>
    </div>
  );
};
