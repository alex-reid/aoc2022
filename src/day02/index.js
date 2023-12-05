import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((v) => v.split(" "));

const scores = {
  // r
  A: {
    // r
    X: 1 + 3,
    // p
    Y: 2 + 6,
    // s
    Z: 3,
  },
  // p
  B: {
    // r
    X: 1,
    // p
    Y: 2 + 3,
    // s
    Z: 3 + 6,
  },
  // s
  C: {
    // r
    X: 1 + 6,
    // p
    Y: 2,
    // s
    Z: 3 + 3,
  },
};

const tests = { X: "lose", Y: "draw", Z: "win" };
const play = {
  A: { lose: "Z", draw: "X", win: "Y" },
  B: { lose: "X", draw: "Y", win: "Z" },
  C: { lose: "Y", draw: "Z", win: "X" },
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let out = 0;
  for (const round of input) {
    const score = scores[round[0]][round[1]];
    out += score;
  }
  return out;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let out = 0;
  for (const round of input) {
    const t = tests[round[1]];
    const p = play[round[0]][t];
    out += scores[round[0]][p];
  }

  return out;
};

run({
  part1: {
    tests: [
      {
        input: `A Y
B X
C Z`,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `A Y
B X
C Z`,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
