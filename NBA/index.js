const fs = require("fs");
const data = fs
  .readFileSync("nba_finals.csv")
  .toString()
  .replace(/\r\n/g, "\n")
  .split("\n");

const finals = [];

const finalsData = function () {
  for (let i = 1; i < data.length; i++) {
    let arr = data[i].split(",");
    let newObj = {
      Year: parseInt(arr[0]),
      Winner: arr[1],
      Loser: arr[2],
      Score: arr[3],
      MVP: arr[4] || "",
    };
    finals.push(newObj);
  }
};

finalsData(data);

function winnerByYear(year) {
  finals.forEach((el) => {
    if (el.Year === year) console.log(el.Winner);
  });
}

function timesWon(team) {
  let won = 0;
  finals.forEach((el) => {
    if (el.Winner === team) won++;
  });
  console.log(`${team} Championships: ${won}`);
}

function firstWin(team) {
  let yearsWon = [];
  let firstYear;
  finals.forEach((el) => {
    if (el.Winner === team) yearsWon.push(el.Year);
  });
  yearsWon.forEach((el) => {
    if (!firstYear || el < firstYear) firstYear = el;
  });
  console.log(`The ${team} first won the NBA Finals in ${firstYear}`);
}

let winners = [];
let losers = [];
const neverWon = finals.forEach((el) => {
  winners.push(el.Winner);
  losers.push(el.Loser);
});

let hasNeverWon = [];
losers.forEach((los) => {
  if (winners.find((win) => win === los)) {
    return;
  } else hasNeverWon.push(los);
});
const finalNeverWon = new Set([...hasNeverWon]);

console.log(finalNeverWon);

const wonMVP = [];
finals.forEach((el) => {
  let found = wonMVP.find((player) => player.name === el.MVP);
  if (found && found.name !== "") {
    found.won++;
  } else if (!found && el.MVP !== "") {
    obj = {
      name: el.MVP,
      won: 1,
    };
    wonMVP.push(obj);
  }
});

let multMVP = [];
let max = 1;
wonMVP.forEach((el) => {
  let found = multMVP.find((num) => num.won === el.won);
  if (!found && el.won > 1) {
    let obj = {
      won: el.won,
      name: [el.name],
    };
    multMVP.push(obj);
  } else if (found) {
    found.name.push(el.name);
  }
});

for (let i = multMVP.length - 1; i >= 0; i--) {
  console.log(`${multMVP[i].won} times: ${multMVP[i].name}`);
}
