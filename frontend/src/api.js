import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
});

export const parsePipeline = (nodes, edges) =>
  api
    .post("/pipelines/parse", { nodes, edges })
    .then((response) => response.data);
