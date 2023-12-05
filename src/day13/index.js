import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n\n").map((v) => v.split("\n").map((v2) => eval(v2)));

const compare = (l, r) => {
  console.log(l, r);
  if (l.length == 0 && r.length > 0) {
    console.log("left is out");
    return true;
  }
  if (l.length > 0 && r.length == 0) {
    console.log("right is out");
    return false;
  }
  const cL = l.shift();
  const cR = r.shift();
  console.log(cL, cR);

  if (typeof cL == "number" && typeof cR == "number") {
    console.log("both nums");
    if (cL < cR) {
      return true;
    } else if (cL == cR) {
      // recurse
      return compare(l, r);
    } else {
      return false;
    }
  }
  if (typeof cL == "object" && typeof cR == "object") {
    console.log("both arrs");
    const nL = cL;
    const nR = cR;
    // recurse
    return compare(nL, nR);
  }
  if (typeof cL == "number" && typeof cR == "object") {
    console.log("l num r arr");
    const nL = [cL];
    const nR = cR;
    // recurse
    return compare(nL, nR);
  }
  if (typeof cL == "object" && typeof cR == "number") {
    console.log("l arr r num");
    const nL = cL;
    const nR = [cR];
    // recurse
    return compare(nL, nR);
  }
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  //console.log(JSON.stringify(input, null, 2));
  console.log(compare(input[1][0], input[1][1]));
  // const out = [];
  // for (const [index, message] of input.entries()) {
  //   // const flatL = message[0].flat(99);
  //   // const flatR = message[1].flat(99);
  //   // if (flatL.length > 0 && flatR.length > 0) {
  //   // }
  //   console.log("comparing", message);
  //   out.push(compare(message[0], message[1]));
  //   // console.log(
  //   //   message[0].flat(99),
  //   //   // message[0].length,
  //   //   // message[0][0],
  //   //   // typeof message[0][0],
  //   //   message[1].flat(99),
  //   //   // message[1].length,
  //   //   // message[1][0],
  //   //   // typeof message[1][0],
  //   // );
  // }
  // console.log(out);

  return;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`,
        expected: "",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
