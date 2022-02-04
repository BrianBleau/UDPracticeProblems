const fs = require("fs");
const scrabbleWords = fs.readFileSync("./sowpods.txt").toString().split("\r\n");

/**
'A' char code 65
[
    ZTU
    XUS
    TRI
]
*/

//takes word as input and return the found word or not found
const wordSearch = function (input) {
    let wordBank = scrabbleWords;
    let low = 0;
    let high = wordBank.length - 1;
    let mid = Math.floor(wordBank.length / 2);
  
    while (input != wordBank[mid] && low < high) {
      if (input < wordBank[mid]) {
        high = mid - 1;
      } else if (input > wordBank[mid]) {
        low = mid + 1;
      }
      mid = Math.floor((low + high) / 2);
    }
    return wordBank[mid] == input
      ? true : false;
  };

  //Binary search for a substring of a word
const partialSearch = function (input) {
    input = input.toUpperCase();
    let wordBank = scrabbleWords;
    let low = 0;
    let high = wordBank.length;
    let mid = Math.floor(wordBank.length / 2);
    let bankLength = input.length;
    let middleWord = wordBank[mid];
  
    while (input != middleWord.substring(0, bankLength) && low <= high) {
        //console.log(low, mid, high)
        
        middleWord = wordBank[mid];
        //console.log(input, middleWord.substring(0, bankLength))
        
        if (input < middleWord.substring(0, bankLength)) {
        high = mid - 1;
        } else if (input > middleWord.substring(0, bankLength)) {
        low = mid + 1;
        }
        mid = Math.floor((low + high) / 2);
    }  
    if(input == middleWord.substring(0, bankLength)) {
            
        return true;
    }
    return false;
  };
  //console.log(partialSearch('MAL'))


const boggleSolverFast = function (letterArray) {
    let startTime = Date.now();
    let grid = {};
    let x = 0;
    let y = 0;
    let maxRow = Math.sqrt(letterArray.length) - 1;
    
    //Assigns each letter to a grid sqrt x sqrt grid and maps out coords
    for ( let i = 0; i < letterArray.length; i++) {
        let letterSpace = String.fromCharCode(65 + i);
        let coords = [x, y];
        grid[letterSpace] = {
            letter : letterArray[i],
            coords : coords,
            adj : {}
        }
        if ( x < maxRow ) {
            x += 1;
        } 
        else {
            y += 1;
            x = 0;
        }
    }
    // Maps each elements adjacent vertices by checking if the absolute value difference of each coords is 1 or less 
    (findAdj = function () {
        for ( currObj in grid ) {
            for ( nextObj in grid ) {
                if ( currObj != nextObj ) {
                    if (Math.abs(grid[currObj].coords[0] - grid[nextObj].coords[0]) <= 1 && Math.abs(grid[currObj].coords[1] - grid[nextObj].coords[1]) <=1) {
                            grid[currObj].adj[nextObj] = grid[nextObj]; //here is where we need to add the adj key values
                        }
                }
            }
        }
    })();

    // Helper function to compare the elements adjacent vertices to the input visited
    const hasAdj = function (element, visited) {
        for (el in element.adj) {
            if (!visited[el]) {
                return true;
            }
        }
        return false;
     }

    let answerArray = [];

    //DFS by recursively passing the visited and adj nodes to the function
    const dfs = function ( node, visited = {}, currStr = "" ) {
        let newStr = currStr + node.letter;
        if (newStr.length > 2 && wordSearch(newStr) == true) answerArray.push(newStr);
        if (newStr.length > 2 && partialSearch(newStr) == false) {
             return;
        }
        if ( hasAdj(node, visited) == true ) {
            for (el in grid) {
                if (node === grid[el]) {
                    visited[el] = true;
                }
            }
            for ( el in node.adj ) {
                if ( !visited[el] ) {
                    let newVisited = {};    
                    Object.assign(newVisited, visited);
                    newVisited[el] = true;
                    dfs(grid[el], newVisited, newStr);
                }
            }
        }
    }
    for ( el in grid ) {
        dfs(grid[el]);   
    }
    let finalAnswer = new Set(answerArray);
    console.log(Date.now() - startTime)
    return finalAnswer;
}

const boggleSolverSlow = function (letterArray) {
    let grid = {};
    let x = 0;
    let y = 0;
    let maxRow = Math.sqrt(letterArray.length) - 1;
    let startTime = Date.now();
    
    //Assigns each letter to a grid sqrt x sqrt grid and maps out coords
    for ( let i = 0; i < letterArray.length; i++) {
        let letterSpace = String.fromCharCode(65 + i);
        let coords = [x, y];
        grid[letterSpace] = {
            letter : letterArray[i],
            coords : coords,
            adj : {}
        }
        if ( x < maxRow ) {
            x += 1;
        } 
        else {
            y += 1;
            x = 0;
        }
    }
    // Maps each elements adjacent vertices by checking if the absolute value difference of each coords is 1 or less 
    (findAdj = function () {
        for ( currObj in grid ) {
            for ( nextObj in grid ) {
                if ( currObj != nextObj ) {
                    if (Math.abs(grid[currObj].coords[0] - grid[nextObj].coords[0]) <= 1 && Math.abs(grid[currObj].coords[1] - grid[nextObj].coords[1]) <=1) {
                            grid[currObj].adj[nextObj] = grid[nextObj]; //here is where we need to add the adj key values
                        }
                }
            }
        }
    })();

    // Helper function to compare the elements adjacent vertices to the input visited
    const hasAdj = function (element, visited) {
        for (el in element.adj) {
            if (!visited[el]) {
                return true;
            }
        }
        return false;
     }

    let answerArray = [];

    //DFS by recursively passing the visited and adj nodes to the function
    const dfs = function ( node, visited = {}, currStr = "" ) {
        let newStr = currStr + node.letter;
        if (newStr.length > 2 && wordSearch(newStr) == true) answerArray.push(newStr);
        // if (newStr.length > 2 && partialSearch(newStr) == false) {
        //      return;
        // }
        if ( hasAdj(node, visited) == true ) {
            for (el in grid) {
                if (node === grid[el]) {
                    visited[el] = true;
                }
            }
            for ( el in node.adj ) {
                if ( !visited[el] ) {
                    let newVisited = {};    
                    Object.assign(newVisited, visited);
                    newVisited[el] = true;
                    dfs(grid[el], newVisited, newStr);
                }
            }
        }
    }
    for ( el in grid ) {
        dfs(grid[el]);   
    }
    let finalAnswer = new Set(answerArray);
    console.log(Date.now() - startTime);
    return finalAnswer;
}
//const one = boggleSolverFast('MSEFRATDLONEKAFB')
//const two = boggleSolverSlow('MSEFRATDLONEKAFB')

//const diff = two.filter(el => !one.includes(el));
console.log(boggleSolverFast('MSEFRATDLONEKAFB'))


//console.log(scrabbleWords.indexOf('BEDESMAN'))

/**
 * MSEF   mala 133725
 * RATD   mal 133724
 * LONE   EANED LORATE SEANED BEDESMAN ATOKAL
 * KAFB 
 */


