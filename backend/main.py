from typing import Any, Dict, List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class Pipeline(BaseModel):
    """A pipeline as sent by the frontend: React Flow nodes and edges."""

    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]


def is_dag(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    """Return True if the nodes/edges form a directed acyclic graph.

    Uses Kahn's algorithm: repeatedly remove nodes that have no remaining
    incoming edges. If every node can be removed this way there is no
    cycle, so the graph is a DAG.
    """
    node_ids = {node.get("id") for node in nodes}
    adjacency: Dict[Any, List[Any]] = {node_id: [] for node_id in node_ids}
    in_degree: Dict[Any, int] = {node_id: 0 for node_id in node_ids}

    for edge in edges:
        source = edge.get("source")
        target = edge.get("target")
        if source in node_ids and target in node_ids:
            adjacency[source].append(target)
            in_degree[target] += 1

    queue = [node_id for node_id in node_ids if in_degree[node_id] == 0]
    visited = 0
    while queue:
        current = queue.pop()
        visited += 1
        for neighbor in adjacency[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(node_ids)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    """Report the node/edge counts and whether the pipeline is a DAG."""
    return {
        "num_nodes": len(pipeline.nodes),
        "num_edges": len(pipeline.edges),
        "is_dag": is_dag(pipeline.nodes, pipeline.edges),
    }
