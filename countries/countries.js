const fs = require("fs");

const countries = fs.readFileSync("countries.txt").toString().split("\n");
const vowels = ["a", "e", "i", "o", "u"];

//What are all of the countries that have “United” in the name?

(problemOne = () => {
  let answer = [];
  for (country of countries) {
    if (country.includes("United")) {
      answer.push(country);
    }
  }
  console.log("Answer One: ", answer);
})();

//What countries both begin and end with a vowel?

(problemTwo = () => {
  let answer = [];
  for (country of countries) {
    for (vowel of vowels) {
      if (country.toLowerCase().charAt(0) === vowel) {
        for (vowel of vowels) {
          if (country.toLowerCase().charAt(country.length - 1) === vowel) {
            answer.push(country);
          }
        }
      }
    }
  }
  console.log("Answer Two: ", answer);
})();

//What country names are > 50% vowels?

(problemThree = () => {
  let answer = [];
  for (country of countries) {
    let foundVowels = 0;
    for (letter of country) {
      for (vowel of vowels) {
        if (letter === vowel) {
          foundVowels += 1;
        }
      }
    }
    if (foundVowels / country.length > 0.5) {
      answer.push(country);
    }
  }
  console.log("Answer Three: ", answer);
})();

//What is the shortest country name? Make sure your solution can handle ties.

(problemFour = () => {
  let countryLength = 1000;
  let answer = [];
  for (country of countries) {
    if (country.length === countryLength) {
      answer.push(country);
    }
    if (country.length < countryLength) {
      answer = [];
      answer.push(country);
      countryLength = country.length;
    }
  }
  console.log("Answer Four: ", answer);
})();

//What countries use only one vowel in their name (the vowel can be used multiple times)

(problemFive = () => {
  let answer = [];
  for (country of countries) {
    let foundVowel = [];
    for (letter of country.toLowerCase()) {
      for (vowel of vowels) {
        if (letter === vowel && !foundVowel.includes(vowel)) {
          foundVowel.push(vowel);
        }
      }
    }
    if (foundVowel.length === 1) {
      answer.push(country);
    }
  }

  console.log("Answer Five: ", answer);
})();

//There is at least one country name that contains another country name. Find all of these cases.

(problemSix = () => {
  let answer = [];
  for (country of countries) {
    for (second of countries) {
      if (
        country.toLowerCase().includes(second.toLowerCase()) &&
        country !== second
      ) {
        answer.push(country);
        console.log(country, second);
      }
    }
  }
  console.log("Answer Six: ", answer);
})();
