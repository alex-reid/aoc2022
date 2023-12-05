import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.match(/Monkey \d:(\n.*){5}/gm).map((v) => {
    const lines = v.split("\n");
    const operation = lines[2].match(/(old|[\+\*]|\d+)/g);
    return {
      items: lines[1].match(/(\d+)/g).map((v) => parseInt(v)),
      operation: [
        operation[1],
        operation[2] == "old" ? "old" : parseInt(operation[2]),
      ],
      divisibleBy: parseInt(lines[3].match(/(\d+)/g)[0]),
      ifTrue: parseInt(lines[4].match(/(\d+)/g)[0]),
      ifFalse: parseInt(lines[5].match(/(\d+)/g)[0]),
      inspected: 0,
    };
  });

const operate = (input, operand, value) => {
  const newValue = value == "old" ? input : value;
  let out = operand == "+" ? input + newValue : input * newValue;
  return Math.floor(out / 3);
};

const operateMod = (input, operand, value) => {
  const newValue = value == "old" ? input : value;
  let out = operand == "+" ? input + newValue : input * newValue;
  return out;
};

function runSim(input, rounds, round2 = false) {
  const modulo = input.reduce((a, b) => a * b.divisibleBy, 1);
  for (let index = 0; index < rounds; index++) {
    //console.log("round", index);
    for (const monkey of input) {
      while (monkey.items.length > 0) {
        monkey.inspected++;
        let item = monkey.items.shift();
        item = round2
          ? operateMod(item, monkey.operation[0], monkey.operation[1]) % modulo
          : operate(item, monkey.operation[0], monkey.operation[1]) % modulo;
        if (item % monkey.divisibleBy == 0) {
          input[monkey.ifTrue].items.push(item);
        } else {
          input[monkey.ifFalse].items.push(item);
        }
      }
    }
  }
  input.forEach((element, i) => {
    console.log("monkey", i, element.inspected);
  });
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  runSim(input, 20);
  const out = input.map((v) => v.inspected).sort((a, b) => b - a);
  return out[0] * out[1];
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  runSim(input, 10000, true);
  const out = input.map((v) => v.inspected).sort((a, b) => b - a);
  return out[0] * out[1];
};

run({
  part1: {
    tests: [
      {
        input: `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`,
        expected: 10605,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Monkey 0:
        Starting items: 79, 98
        Operation: new = old * 19
        Test: divisible by 23
          If true: throw to monkey 2
          If false: throw to monkey 3
      Monkey 1:
        Starting items: 54, 65, 75, 74
        Operation: new = old + 6
        Test: divisible by 19
          If true: throw to monkey 2
          If false: throw to monkey 0
      Monkey 2:
        Starting items: 79, 60, 97
        Operation: new = old * old
        Test: divisible by 13
          If true: throw to monkey 1
          If false: throw to monkey 3
      Monkey 3:
        Starting items: 74
        Operation: new = old + 3
        Test: divisible by 17
          If true: throw to monkey 0
          If false: throw to monkey 1`,
        expected: 2713310158,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
