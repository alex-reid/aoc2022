import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput
    .split("\n")
    .map((v) =>
      v.split(",").map((v1) => v1.split("-").map((v2) => parseInt(v2))),
    );

const isBetween = (a, b) => a >= b[0] && a <= b[1];

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let output = 0;
  for (const pair of input) {
    if (
      (pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1]) ||
      (pair[1][0] <= pair[0][0] && pair[1][1] >= pair[0][1])
    ) {
      output++;
    }
  }
  return output;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let output = 0;
  for (const pair of input) {
    if (
      isBetween(pair[0][0], pair[1]) ||
      isBetween(pair[0][1], pair[1]) ||
      isBetween(pair[1][0], pair[0]) ||
      isBetween(pair[1][1], pair[0])
    ) {
      //console.log(pair);
      output++;
    }
  }
  return output;
};

run({
  part1: {
    tests: [
      {
        input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
        expected: 2,
      },
      {
        input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
4-4,4-4`,
        expected: 3,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
