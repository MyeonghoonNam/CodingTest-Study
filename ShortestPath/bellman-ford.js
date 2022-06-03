// 벨만 포드 알고리즘
const bellmanFord = (start_node) => {
  distance[start_node] = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      const { start, end, time } = edges[j]; // 간선정보를 [시작, 끝, 경로] 형태로

      if (
        distance[start] !== Infinity &&
        distance[end] > distance[start] + time
      ) {
        distance[end] = distance[start] + time;

        if (i === N - 1) return true;
      }
    }
  }

  return false;
};
