import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput
    .split("\n\n")
    .map((i) => i.split("\n").reduce((a, c) => (a += parseInt(c)), 0));

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  return input.reduce((a, c) => (c > a ? c : a), 0);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const out = input.sort((a, b) => b - a);
  return out[0] + out[1] + out[2];
};

run({
  part1: {
    tests: [
      {
        input: `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
