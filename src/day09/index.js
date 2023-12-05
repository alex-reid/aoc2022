import run from "aocrunner";

const dir = {
  R: [1, 0],
  U: [0, -1],
  L: [-1, 0],
  D: [0, 1],
};

const parseInput = (rawInput) =>
  rawInput.split("\n").map((v) =>
    v.split(" ").map((v2, i) => {
      return i == 1 ? parseInt(v2) : dir[v2];
    }),
  );

const nVec = (v) => {
  if (v > 0) return 1;
  if (v < 0) return -1;
  return 0;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  //console.log(input);
  let hPos = { x: 0, y: 0 };
  let tPos = { x: 0, y: 0 };
  const hasVisited = new Set();
  hasVisited.add("start");
  for (const [dir, steps] of input) {
    //console.log(dir, steps);
    for (let s = 0; s < steps; s++) {
      hPos.x += dir[0];
      hPos.y += dir[1];
      const vx = hPos.x - tPos.x;
      const vy = hPos.y - tPos.y;
      if (Math.abs(vx) > 1 || Math.abs(vy) > 1) {
        tPos.x += nVec(vx);
        tPos.y += nVec(vy);
        //console.log(tPos, hPos, [vx, vy]);
        hasVisited.add("x" + tPos.x + "y" + tPos.y);
      }
      //console.log(s, { hPos, tPos });
    }
  }
  //console.log(hasVisited);

  return hasVisited.size;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const length = 10;
  const rope = new Array(length).fill().map((v) => ({ x: 0, y: 0 }));
  const hasVisited = new Set();
  hasVisited.add("start");
  for (const [dir, steps] of input) {
    //console.log(dir, steps);
    for (let s = 0; s < steps; s++) {
      rope[0].x += dir[0];
      rope[0].y += dir[1];
      for (let k = 1; k < length; k++) {
        const vx = rope[k - 1].x - rope[k].x;
        const vy = rope[k - 1].y - rope[k].y;
        if (Math.abs(vx) > 1 || Math.abs(vy) > 1) {
          rope[k].x += nVec(vx);
          rope[k].y += nVec(vy);
          //console.log(tPos, hPos, [vx, vy]);
          if (k === 9) hasVisited.add("x" + rope[k].x + "y" + rope[k].y);
        }
      }
      //console.log(s, { hPos, tPos });
    }
  }

  return hasVisited.size;
};

run({
  part1: {
    tests: [
      {
        input: `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`,
        expected: 1,
      },
      {
        input: `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`,
        expected: 36,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
