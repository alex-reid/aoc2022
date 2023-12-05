import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((v) => v.split(" "));

const buildFS = (input) => {
  let path = {};
  const fileSystem = { "/": { _f: [] } };
  let currentDir = [];
  for (let line = 0; line < input.length; line++) {
    const element = input[line];

    // if element is command
    if (element[0] == "$") {
      // command is change directory
      if (element[1] == "cd") {
        //console.log("change dir to", element[2]);
        if (element[2] == "/") {
          currentDir = [fileSystem["/"]];
          path = fileSystem["/"];
        } else if (element[2] == "..") {
          currentDir.pop();
          path = currentDir[currentDir.length - 1];
        } else {
          path = path[element[2]];
          currentDir.push(path);
        }
      }
    } else if (element[0] == "dir") {
      //console.log("directory", element[1]);
      if (!path[element[1]]) path[element[1]] = { _f: [] };
    } else {
      path._f.push(parseInt(element[0]));
    }
  }
  return fileSystem;
};

const writeSizes = (currentDir) => {
  for (const path in currentDir) {
    if (path == "_f") {
      currentDir._size = currentDir[path].reduce((a, c) => (a += c), 0);
    } else {
      writeSizes(currentDir[path]);
    }
  }
};

const getTotalSize = (currentDir) => {
  let acc = 0;
  for (const path in currentDir) {
    if (path[0] != "_") {
      acc += getTotalSize(currentDir[path]);
    }
  }
  acc += currentDir._size;
  currentDir._totalSize = acc;
  return acc;
};

const getLessThan10k = (currentDir) => {
  let acc = 0;
  for (const path in currentDir) {
    if (path[0] != "_") {
      acc += getLessThan10k(currentDir[path]);
    }
  }
  if (currentDir._totalSize <= 100000) acc += currentDir._totalSize;
  return acc;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const fileSystem = buildFS(input);

  writeSizes(fileSystem["/"]);
  getTotalSize(fileSystem["/"]);
  return getLessThan10k(fileSystem["/"]);
};

const getDeleteCandidates = (currentDir, deleteSize, candidates) => {
  if (currentDir._totalSize >= deleteSize) {
    candidates.push(currentDir._totalSize);
  }
  for (const path in currentDir) {
    if (path[0] != "_") {
      getDeleteCandidates(currentDir[path], deleteSize, candidates);
    }
  }
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const fileSystem = buildFS(input);

  writeSizes(fileSystem["/"]);
  getTotalSize(fileSystem["/"]);
  const total = 70000000;
  const needed = 30000000;
  const currentSize = fileSystem["/"]._totalSize;
  const freeSpace = total - currentSize;
  const toDelete = needed - freeSpace;

  console.log("free", freeSpace, "need to delete", toDelete);

  const candidates = [];
  getDeleteCandidates(fileSystem["/"], toDelete, candidates);
  console.log(candidates.sort());
  return candidates.sort()[0];
};

run({
  part1: {
    tests: [
      {
        input: `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 95437,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 24933642,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
