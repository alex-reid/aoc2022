import run from "aocrunner";

const parseInput = (rawInput) => {
  let start = [0, 0];
  let end = [0, 0];

  const grid = rawInput.split("\n").map((v, yI) =>
    v
      .trim()
      .split("")
      .map((v2, xI) => {
        let code = v2.charCodeAt(0);
        if (code == 83) {
          start = [xI, yI];
          return 0;
        }
        if (code == 69) {
          end = [xI, yI];
          return 25;
        }
        return code - 97;
      }),
  );

  return {
    start,
    end,
    grid,
  };
};

const inBounds = (arr, x, y) => {
  return x >= 0 && y >= 0 && x < arr[0].length && y < arr.length;
};

const delta = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };

const canMove = (arr, x, y) => {
  const currVal = arr[y][x];
  const moves = { up: false, down: false, left: false, right: false };
  for (const dir in moves) {
    if (inBounds(arr, x + delta[dir][0], y + delta[dir][1])) {
      const d = arr[y + delta[dir][1]][x + delta[dir][0]];
      moves[dir] = d - currVal >= -25 && d - currVal <= 1;
    }
  }
  return moves;
};

const bfs = (arr, s, e) => {
  const width = arr[0].length;
  const prev = solve(arr, s);
  return reconstruct(s[1] * width + s[0], e[1] * width + e[0], prev, width);
};

const solve = (arr, s) => {
  const queue = [];
  queue.push(s);
  const width = arr[0].length;
  const length = arr.length * arr[0].length;
  const visited = new Array(length).fill().map((v) => false);
  visited[s[1] * width + s[0]] = true;
  const prev = new Array(length).fill().map((v) => null);
  //console.log(queue);
  let count = 0;
  while (queue.length > 0 && count < 20000) {
    //count++;
    const node = queue.shift();
    const neighbours = arr[node[1]][node[0]];
    //console.log(node, neighbours);
    for (const dir in neighbours) {
      //console.log(dir, neighbours[dir]);
      if (neighbours[dir]) {
        let next = null;
        if (dir == "up") {
          next = [node[0], node[1] - 1];
        }
        if (dir == "right") {
          next = [node[0] + 1, node[1]];
        }
        if (dir == "down") {
          next = [node[0], node[1] + 1];
        }
        if (dir == "left") {
          next = [node[0] - 1, node[1]];
        }
        if (!visited[next[0] + next[1] * width]) {
          queue.push(next);
          visited[next[0] + next[1] * width] = true;
          prev[next[0] + next[1] * width] = node;
          //console.log("q", queue, "n", next, "c", node, prev);
        }
      }
    }
  }

  //printSolve(prev, width);
  return prev;
};

const reconstruct = (s, e, prev, width) => {
  const path = [];
  //console.log(prev, prev[s], prev[e], s, e, width);
  for (
    let at = e;
    at != null;
    at = prev[at] != null ? prev[at][1] * width + prev[at][0] : null
  ) {
    path.push(at);
    //console.log(prev[at]);
  }
  path.reverse();

  if (path[0] == s) return path;
};

const part1 = (rawInput) => {
  const { start, end, grid } = parseInput(rawInput);
  const moves = grid.map((v, y) => v.map((v, x) => canMove(grid, x, y)));
  return bfs(moves, start, end).length - 1;
};

const part2 = (rawInput) => {
  const { start, end, grid } = parseInput(rawInput);
  const moves = grid.map((v, y) => v.map((v, x) => canMove(grid, x, y)));
  const pathLength = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] == 0) {
        const path = bfs(moves, [x, y], end);
        if (path) pathLength.push(path.length - 1);
      }
    }
  }
  pathLength.sort((a, b) => a - b);
  console.log(pathLength);
  return pathLength[0];
};

run({
  part1: {
    tests: [
      {
        input: `Sabqponm
      abcryxxl
      accszExk
      acctuvwj
      abdefghi`,
        expected: 31,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Sabqponm
      abcryxxl
      accszExk
      acctuvwj
      abdefghi`,
        expected: 29,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

const printPath = (arr, rL) => {
  console.log(
    arr.reduce((a, c, i) => {
      let out = c ? "#" : ".";
      if ((i + 1) % rL == 0) out += "\n";
      return (a += out);
    }, ""),
  );
};

const printSolve = (arr, rL) => {
  console.log(
    arr.reduce((a, c, i) => {
      let out = !!c ? "#" : ".";
      if ((i + 1) % rL == 0) out += "\n";
      return (a += out);
    }, ""),
  );
};
