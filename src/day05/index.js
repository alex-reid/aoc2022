import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n\n").map((v, i) => {
    if (i === 0) {
      const rawStack = v.match(/( {4}|\w|\d)/g);
      const cols = parseInt(rawStack.slice(-1));
      const rows = rawStack.length / cols - 1;
      const stack = [];
      for (let column = 0; column < cols; column++) {
        stack[column] = [];
        for (let row = rows - 1; row >= 0; row--) {
          const index = row * cols + column;
          if (rawStack[index] != "    ") stack[column].push(rawStack[index]);
        }
      }
      return stack;
    }
    return v
      .split("\n")
      .map((v) => v.match(/(\d+)/g).map((v1) => parseInt(v1)));
  });

const part1 = (rawInput) => {
  const [stack, method] = parseInput(rawInput);
  for (const step of method) {
    const [amount, colFrom, colTo] = step;
    for (let i = 0; i < amount; i++) {
      stack[colTo - 1].push(stack[colFrom - 1].pop());
    }
  }
  let out = "";
  stack.forEach((col) => {
    out += col.pop();
  });
  return out;
};

const part2 = (rawInput) => {
  const [stack, method] = parseInput(rawInput);
  for (const step of method) {
    const [amount, colFrom, colTo] = step;
    stack[colTo - 1].push(...stack[colFrom - 1].splice(-amount));
  }
  let out = "";
  stack.forEach((col) => {
    out += col.pop();
  });
  return out;
};

run({
  part1: {
    tests: [
      {
        input: `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "CMZ",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "MCD",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
