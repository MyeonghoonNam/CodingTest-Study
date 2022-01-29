# 탐색
- 탐색이란 `많은 양의 데이터 중에서 원하는 데이터를 찾는 과정`을 의미한다.
- 대표적인 탐색 알고리즘으로 `DFS`와 `BFS`가 활용된다.
- DFS와 BFS를 제대로 이해하려면 기본 자료구조인 스택과 큐 그리고 재귀 함수에 대한 기초 지식이 필요하다.

# 자료구조
- 자료구조란 `데이터를 표현하고 관리하고 처리하기 위한 구조`를 의미한다.
- 그 중에 스택과 큐는 자료구조의 기초 개념으로 `삽입(Push)`, `삭제(Pop)` 함수가 핵심으로 구성된다.

# 스택
- 먼저 입력된 자료가 나중에 나오는 형식의 자료구조이다.
- `선입후출(First In Last Out)` 또는 `후입선출(Last In First Out)`구조라고 한다.

# 큐
- 스택과 반대로 먼저 입력된 자료구조가 먼저 나오는 형식의 자료구조이다.
- `선입선출(First In First Out)`구조라고 한다.

# 재귀 함수
- `자기 자신을 다시 호출하는 함수`를 의미한다.
- 재귀 함수를 구현할 때에는 항상 `종료 조건`을 명시하도록 주의해야 한다. 자칫 잘못하면 무한루프에 빠지게 되어 치명적인 오류가 발생할 수 있기 때문이다.
- 컴퓨터 내부에서 재귀 함수의 수행은 `스택` 자료구조를 이용한다. `재귀 함수는 내부적으로 스택 자료구조와 동일`하며 따라서 스택 자료구조를 활용해야 하는 상당수 알고리즘은 재귀 함수를 이용하여 구현할 수 있다. 이에 대표적인 예가 `DFS` 알고리즘이다.
- 반복문 대신 재귀 함수를 사용할 때의 장점은 재귀 함수가 수학의 `점화식`을 그대로 소스코드로 옮겨 사용되기에 `코드가 더 간결`해진다는 점이 있다.

# DFS
- DFS(Depth-First Search)는 깊이 우선 탐색이라고도 부르며, 그래프에서 깊은 부분을 우선적으로 탐색하는 알고리즘이다.
- DFS를 이해하기 위해 그래프의 기본 구조를 이해해야한다.
- [그래프 기본 이론 정리](https://velog.io/@codenmh0822/%EB%B9%84%EC%84%A0%ED%98%95-%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-%EA%B7%B8%EB%9E%98%ED%94%84Graph)
- 특정한 경로를 탐색하다가 최대한 깊숙히 들어가서 탐색 후 다시 경로 탐색 시작점으로 돌아와 다른 경로로 탐색한다.
- DFS 동작방식
  1. 탐색 시작 노드를 스택에 삽입하고 방문 처리를 한다.
  2. 스택의 최상단 노드에 방문하지 않은 인접 노드가 있으면 그 인접 노드를 스택에 넣고 방문 처리를하며 방문하지 않은 인접 노드가 없으면 스택에서 최상단 노드를 꺼낸다.
  3. 2번의 과정을 더 이상 수행할 수 없을 때까지 반복한다.

# BFS
- BFS(Breadth First Search) 알고리즘은 `너비 우선 탐색`이라고도 부르며 `가까운 노드부터 탐색하는 알고리즘`이다.
- DFS는 최대한 멀리 있는 노드까지 깊게 들어가며 노드를 탐색하는 반면 BFS는 그 반대의 의미를 가진다.
- DFS는 스택 자료구조를 주로 활용하지만 BFS는 선입선출 방식의 큐 자료구조를 주로 활용한다.
- BFS 동작방식
  1. 탐색 시작 노드를 큐에 삽입하고 방문 처리를 한다.
  2. 큐에서 노드를 꺼내 해당 노드의 인접 노드 중에서 방문하지 않은 노드를 모두 큐에 삽입하고 방문 처리를 한다.
  3. 2번의 과정을 더 이상 수행할 수 없을 때까지 반복한다.

# 비교
- DFS: 스택, 재귀 함수 활용, 경로의 특징을 저장하는 유형에 유리
- BFS: 큐 활용, 최단거리를 구하는 유형에 유리
- 재귀 함수로 DFS를 구현하면 컴퓨터 시스템의 스택 동작 특성상 실제 프로그램의 수행 시간은 느려질 수 있다. 수행 시간에 영향이 갈정도로 데이터의 규모가 커진다면 일반적으로 DFS보다는 BFS를 활용하는게 조금 더 빠른 수행 동작을 가져갈 수 있다.