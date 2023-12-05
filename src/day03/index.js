import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const parseChar = (c) => {
  const code = c.charCodeAt(0);
  if (code >= 97) {
    return code - 96;
  }
  return code - 64 + 26;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput).map((v) => [
    v.slice(0, v.length / 2).split(""),
    v.slice(v.length / 2).split(""),
  ]);
  //console.log(input);
  let total = 0;
  for (const rs of input) {
    const fL = rs[0][0];
    for (const cmp1 of rs[0]) {
      if (rs[1].includes(cmp1)) {
        //console.log(parseChar(cmp1), cmp1);
        total += parseChar(cmp1);
        break;
      }
    }
  }
  return total;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput).map((v) => v.split(""));
  let total = 0;

  for (let i = 0; i < input.length; i += 3) {
    //console.log(input[i]);
    const pass1 = input[i].reduce(
      (a, c) => (input[i + 1].includes(c) ? [...a, c] : a),
      [],
    );
    const pass2 = pass1.reduce(
      (a, c) => (input[i + 2].includes(c) ? [...a, c] : a),
      [],
    );
    //console.log(pass2[0]);
    total += parseChar(pass2[0]);
  }
  return total;
};

run({
  part1: {
    tests: [
      {
        input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
