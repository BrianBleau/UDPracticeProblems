const fs = require("fs");
const scrabbleWords = fs.readFileSync("sowpods.txt").toString().split("\n");
const letterScores = {
  a: 1,
  b: 3,
  c: 3,
  d: 2,
  e: 1,
  f: 4,
  g: 2,
  h: 4,
  i: 1,
  j: 8,
  k: 5,
  l: 1,
  m: 3,
  n: 1,
  o: 1,
  p: 3,
  q: 10,
  r: 1,
  s: 1,
  t: 1,
  u: 1,
  v: 4,
  w: 4,
  x: 8,
  y: 4,
  z: 10,
};

const permutations = [];
const findPermutations = function (string) {
  const possComb = [];
  if (string.length < 2) {
    return string;
  }
  for (let i = 0; i < string.length; i++) {
    let char = string[i];
    if (string.indexOf(char) != i) continue;
    possComb.push(char);
    let rest = string.slice(0, i) + string.slice(i + 1, string.length);
    console.log(rest);
    for (perm of findPermutations(rest)) {
      possComb.push(char + perm);
    }
  }
  for (el of possComb) {
    if (!permutations.includes(el)) permutations.push(el);
  }
  return possComb;
};

const legalWords = [];
const cheat = function (input) {
  const final = [];
  findPermutations(input);
  for (perm of permutations) {
    for (word of scrabbleWords) {
      if (perm.toUpperCase() === word) {
        legalWords.push(perm);
      }
    }
  }
  for (word of legalWords) {
    let wordArr = word.split("");
    let sum = 0;
    for (let i = 0; i < wordArr.length; i++) {
      sum += letterScores[wordArr[i]];
    }
    let obj = {
      legalWord: word,
      score: sum,
    };
    final.push(obj);
  }
  let high = 0;
  for (let i = 0; i < final.length; i++) {
    if (final[i].score > high) high = final[i].score;
  }
  while (high > 0) {
    for (word of final) {
      if (high === word.score) console.log(`${word.legalWord} ${word.score}`);
    }
    high--;
  }
};
cheat("abca");
