import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("");

const getWindowOfLength = (array, index, length) => {
  const end = index - length;
  const pad = end < 0 ? new Array(Math.abs(end)) : [];
  return [...pad, ...array.slice(end > 0 ? end : 0, index)];
};

const getStartOfMessage = (input, length) => {
  let out = 0;
  let counter = length + 1;
  for (let index = 0; index < input.length; index++) {
    // get "window" of characters to compare against
    const window = getWindowOfLength(input, index, length);

    // get index of current char in window
    const currentIndexInWindow = window.lastIndexOf(input[index]);

    // decrement counter
    counter--;

    // set counter if the currentIndexInWindow value is higher than the current counter
    if (currentIndexInWindow >= 0 && currentIndexInWindow >= counter)
      counter = currentIndexInWindow;

    // if we are at position of length or greater and the current counter has passed the window
    // get the value and return it
    if (index > length && counter < 0) {
      out = index + 1;
      //console.log(window, input[index]);
      break;
    }
  }
  return out;
};

const getMessageSet = (input, length) => {
  for (let index = 0; index < input.length; index++) {
    const end = index - length;
    if (new Set(input.slice(end > 0 ? end : 0, index)).size == length)
      return index;
  }
};

const part1 = (rawInput) => {
  //const length = 3;
  const input = parseInput(rawInput);
  return getMessageSet(input, 4);
  //return getStartOfMessage(input, length);
};

const part2 = (rawInput) => {
  //const length = 13;
  const input = parseInput(rawInput);
  return getMessageSet(input, 14);
  //return getStartOfMessage(input, length);
};

run({
  part1: {
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 7,
      },
      {
        input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
        expected: 5,
      },
      {
        input: `nppdvjthqldpwncqszvftbrmjlhg`,
        expected: 6,
      },
      {
        input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
        expected: 10,
      },
      {
        input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 19,
      },
      {
        input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
        expected: 23,
      },
      {
        input: `nppdvjthqldpwncqszvftbrmjlhg`,
        expected: 23,
      },
      {
        input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
        expected: 29,
      },
      {
        input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,
        expected: 26,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
