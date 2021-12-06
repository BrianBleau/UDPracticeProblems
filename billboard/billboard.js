const fs = require("fs");

const data = fs
  .readFileSync("billboard100_2000.csv")
  .toString()
  .replace(/\r\n/g, "\n")
  .split("\n");

const billboard = [];

(billboardData = function () {
  for (let i = 1; i < data.length; i++) {
    let arr = data[i].split(",");
    let newObj = {
      rank: parseInt(arr[0]),
      song: arr[1],
      artist: arr[2],
      last: parseInt(arr[3]) || "unranked",
      peak: parseInt(arr[4]),
      weeks: parseInt(arr[5]),
      date: arr[6],
    };
    billboard.push(newObj);
  }
})();

//Print out all of the #1 songs and the artists who made them. If a song was #1 for more than one week, only print it once.

(problemOne = () => {
  let numOne = [];
  for (obj of billboard) {
    let found = numOne.find((el) => el.song === obj.song);
    if (!found && obj.rank === 1) {
      numOne.push(obj);
    }
  }
  numOne.forEach((el) => {
    console.log("Song: ", el.song, "-", "Artist: ", el.artist);
  });
})();

//What song was the #1 song for the most weeks of 2000, who was the artist, and how many weeks was it at #1?

(problemTwo = () => {
  let mostWeeks = [];
  billboard.forEach((el) => {
    if (el.rank === 1) {
      let found = mostWeeks.find((f) => f.name === el.song);
      if (!found) {
        mostWeeks.push({ name: el.song, number: 1 });
      }
      if (found) {
        found.number++;
      }
    }
  });
  let high = 0;
  for (el of mostWeeks) {
    if (el.number > high) {
      high = el.number;
    }
  }
  let final = mostWeeks.find((el) => el.number === high);
  console.log(final);
})();

//What artist had the most songs chart in 2000, and what were those songs?

(problemThree = () => {
  let artists = [];
  for (el of billboard) {
    foundArtist = artists.find((artist) => artist.name === el.artist);
    if (!foundArtist) {
      artists.push({ name: el.artist, songs: [el.song] });
    }
    if (foundArtist) {
      foundSong = foundArtist.songs.find((song) => song === el.song);
      if (!foundSong) {
        foundArtist.songs.push(el.song);
      }
    }
  }
  let mostSongs = 0;
  artists.forEach((el) => {
    if (el.songs.length > mostSongs) {
      mostSongs = el.songs.length;
    }
  });
  artists.forEach((el) => {
    if (el.songs.length === mostSongs) {
      console.log(el);
    }
  });
})();

//What song(s) were on the charts (anywhere on the charts) for the most weeks of 2000?

(problemFour = () => {
  allSongs = [];
  for (el of billboard) {
    const foundSong = allSongs.find((e) => e.name === el.song);
    if (!foundSong) {
      allSongs.push({ name: el.song, number: 1 });
    }
    if (foundSong) {
      foundSong.number++;
    }
  }
  let mostSongs = 0;
  allSongs.forEach((el) => {
    if (el.number > mostSongs) {
      mostSongs = el.number;
    }
  });
  allSongs.forEach((el) => {
    if (el.number === mostSongs) {
      console.log(el);
    }
  });
})();
