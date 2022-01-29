const graph = [
  [],
  [2, 3, 8],
  [1, 7],
  [1, 4, 5],
  [3, 5],
  [3, 4],
  [7],
  [2, 6, 8],
  [1, 7],
];

const visited = new Array(9).fill(false);

const dfs = (graph, vertex, visited) => {
  visited[vertex] = true;
  console.log(vertex);

  graph[vertex].forEach((v) => {
    if (!visited[v]) {
      dfs(graph, v, visited);
    }
  });
};

dfs(graph, 1, visited);
