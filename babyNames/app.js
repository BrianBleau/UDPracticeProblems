const fs = require("fs");

const babies2020 = fs
  .readFileSync("baby_names_2020_short.txt")
  .toString()
  .trim()
  .split("\n");

const babies1880 = fs
  .readFileSync("baby_names_1880_short.txt")
  .toString()
  .trim()
  .split("\n");

const words = fs.readFileSync("sowpods.txt").toString().split("\n");

let answer1;
const ques1 = babies2020.forEach((baby) => {
  if (baby.length && (!answer1 || baby.length < answer1.length)) {
    answer1 = baby;
  }
});
console.log(answer1);

let answer2 = [];
let nameLen = 0;
const ques2 = babies2020.forEach((baby) => {
  if (baby.length > nameLen) {
    nameLen = baby.length;
    answer2 = [];
    answer2.push(baby);
  } else if (baby.length === nameLen) {
    answer2.push(baby);
  }
});

console.log(answer2);

let answer3 = [];
const ques3 = babies2020.forEach((baby) => {
  const reverse = baby.split("").reverse().join("").toUpperCase();
  words.forEach((word) => {
    if (reverse === word) {
      answer3.push(baby);
    }
  });
});

console.log(answer3);

let answer4 = [];
const ques4 = babies2020.forEach((baby20) => {
  babies1880.forEach((baby80) => {
    if (baby20 === baby80) answer4.push(baby20);
  });
});

console.log(answer4);
