import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput
    .split("\n")
    .map((v) =>
      v.split("").map((v2) => ({ h: parseInt(v2), v: false, score: 0 })),
    );

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  for (let y = 0; y < input.length; y++) {
    const row = input[y];
    for (let x = 0; x < row.length; x++) {
      const tree = row[x];
      if (x == 0 || y == 0 || x == row.length - 1 || y == input.length - 1) {
        tree.v = true;
      }
    }
  }
  for (let y = 0; y < input.length; y++) {
    const row = getRow(input, y);
    compare(row);
    compare(row.reverse());
  }
  for (let x = 0; x < input[0].length; x++) {
    const col = getCol(input, x);
    compare(col);
    compare(col.reverse());
  }
  // compare(getCol(input, 2));
  // console.log(printArr(input));

  return getVisible(input);
};

const printArr = (arr) =>
  arr.reduce(
    (a, c) =>
      a +
      c.reduce((a, c) => (a += c.v ? "\x1b[32m" + c.h + "\x1b[0m" : c.h), "") +
      "\n",
    "",
  );

const getRow = (array, row, reverse) => {
  const out = [];
  array[row].forEach((tree) => {
    out.push(tree);
  });
  if (reverse) out.reverse();
  return out;
};

const getCol = (array, col, reverse) => {
  const out = [];
  array.forEach((row) => {
    out.push(row[col]);
  });
  if (reverse) out.reverse();
  return out;
};

const compare = (arr) => {
  let tallest = arr[0].h;
  for (let tree = 0; tree < arr.length; tree++) {
    // if (arr[tree].v) continue;
    if (arr[tree].h > tallest) {
      tallest = arr[tree].h;
      arr[tree].v = true;
    }
  }
  //console.log(arr);
};

const getVisible = (arr) =>
  arr.reduce((a, c) => (a += c.reduce((a, c) => (a += c.v ? 1 : 0), 0)), 0);

const scanTrees = (array, x, y, dX, dY) => {
  //console.log(x, y, dX, dY);
  const treeH = array[y][x].h;
  let mX = x + dX;
  let mY = y + dY;
  let count = 1;
  //console.log(x, y, dX, dY, mX, mY, array[mY][mX], treeH);
  while (treeH > array[mY][mX].h) {
    //console.log(array[mY][mX], count, mX, mY);
    mX += dX;
    mY += dY;
    if (
      // count > 10 ||
      mX < 0 ||
      mY < 0 ||
      mX >= array[0].length ||
      mY >= array.length
    )
      break;
    count++;
  }
  return count;
};

const printScore = (arr) =>
  arr.reduce((a, c) => a + c.reduce((a, c) => (a += c.score), "") + "\n", "");

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  for (let y = 1; y < input.length; y++) {
    const row = input[y];
    for (let x = 1; x < row.length; x++) {
      if (y < input.length - 1 && x < row.length - 1) {
        const sU = scanTrees(input, x, y, 0, -1);
        const sL = scanTrees(input, x, y, -1, 0);
        const sR = scanTrees(input, x, y, 0, 1);
        const sD = scanTrees(input, x, y, 1, 0);
        input[y][x].score = sU * sL * sR * sD;
      }
    }
  }
  // console.log(
  //   printScore(input),
  //   input.reduce((a, c) => {
  //     const row = c.reduce((a, c) => (a < c.score ? c.score : a), 0);
  //     return a < row ? row : a;
  //   }, 0),
  // );
  return input.reduce((a, c) => {
    const row = c.reduce((a, c) => (a < c.score ? c.score : a), 0);
    return a < row ? row : a;
  }, 0);
};

const getHighestScore = (arr) =>
  arr.reduce(
    (a, c) => (a += c.reduce((a, c) => (a = a < c.score ? c.score : a), 0)),
    0,
  );

run({
  part1: {
    tests: [
      {
        input: `30373
25512
65332
33549
35390`,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `30373
25512
65332
33549
35390`,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
