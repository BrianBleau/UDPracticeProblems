const fs = require("fs");
const scrabbleWords = fs.readFileSync("sowpods.txt").toString().split("\r\n");
const letterScores = {
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10,
};

// const permutations = [];
// const findPermutations = function (string) {
//   const possComb = [];
//   if (string.length < 2) {
//     return string;
//   }
//   for (let i = 0; i < string.length; i++) {
//     let char = string[i];
//     if (string.indexOf(char) != i) continue;
//     possComb.push(char);
//     let rest = string.slice(0, i) + string.slice(i + 1, string.length);
//     for (perm of findPermutations(rest)) {
//       possComb.push(char + perm);
//     }
//   }
//   for (el of possComb) {
//     if (!permutations.includes(el)) permutations.push(el);
//   }
//   return possComb;
// };

// const legalWords = [];
// const cheat = function (input) {
//   const final = [];
//   findPermutations(input);
//   for (perm of permutations) {
//     for (word of scrabbleWords) {
//       if (perm.toUpperCase() === word) {
//         legalWords.push(perm);
//       }
//     }
//   }
//   for (word of legalWords) {
//     let wordArr = word.split("");
//     let sum = 0;
//     for (let i = 0; i < wordArr.length; i++) {
//       sum += letterScores[wordArr[i]];
//     }
//     let obj = {
//       legalWord: word,
//       score: sum,
//     };
//     final.push(obj);
//   }
//   let high = 0;
//   for (let i = 0; i < final.length; i++) {
//     if (final[i].score > high) high = final[i].score;
//   }
//   while (high > 0) {
//     for (word of final) {
//       if (high === word.score) console.log(`${word.legalWord} ${word.score}`);
//     }
//     high--;
//   }
// };

// cheat('abcd')

cheat = function (input) {
  let finalWords = [];
  for(word of scrabbleWords){
    let foundWord = '';
    inputArray = input.toUpperCase().split('');
    for(letter of word){
      index = inputArray.indexOf(letter);
      //added wild in elif condition 
      if(index === -1 && !inputArray.includes('_')){
        break;
      } else if (index === -1 && inputArray.includes('_')){
        let index_ = inputArray.indexOf('_');
        foundWord += letter;
        inputArray.splice(index_, 1);
      } else {
        foundWord += inputArray.splice(index, 1);
        if(foundWord === word){
          finalWords.push(foundWord);
        }
      }
    }
  }
  let solution = [];
  for(word of finalWords){
    let sum = 0;
    let obj;
    let wordArray = word.split('');
    for(let i = 0; i < wordArray.length; i++){
      //check for wild scoring
      if(input.toUpperCase().split('').includes(wordArray[i])){
        sum += letterScores[wordArray[i]];
      }
      obj = {
        word: word,
        score: sum
      }
    }
    solution.push(obj);
  }
  sorted = solution.sort((a, b) => {
    return b.score - a.score;
  })
  
  console.log(sorted);
}

cheat('abc_');
