
//part 1
const isPattern = function( input, pattern ) {

    let inpArr;
    let pattArr = pattern.split('');
    if ( Array.isArray(input) == true) {
        inpArr = input;
    } else inpArr = input.split(' ');
    if ( inpArr.length != pattArr.length ) {
        return false;
    }
    let pattHash = {}
    let inpHash = {}

    for (let i = 0; i < inpArr.length; i++) {//patt check if exists or == inp
        if ( pattHash[pattArr[i]] && pattHash[pattArr[i]] != inpArr[i] ||
           inpHash[inpArr[i]] && inpHash[inpArr[i]] !== pattArr[i] ) {
            return false;
        } else {
            pattHash[pattArr[i]] = inpArr[i];
            inpHash[inpArr[i]] = pattHash[i];
        }
    }
    return true;
}


// const arrPerm = function (arr, ind = 1) {
//     for ( let i = ind; i < arr.length; i++ ) {
//         if (isPattern(arr, input) == true) {
//             console.log('found', arr);
//             return true;
//         }
//         while ( arr[i].length >= 2 ) {
//             let newArray = arr;
//             newArray[i - 1] += newArray[i][0];
//             newArray[i] =  newArray[i].substring(1, newArray[i].length);
//             arrPerm(newArray, i);
//             arrPerm(arr, i)
//         }
//     }
//     console.log('none found')
// }

// const isPatternTwo = function (input, pattern) {
//     let patternArray = [];
//     patternArray.length = pattern.length;
//     for ( let i = 0; i < patternArray.length; i++ ) {
//         if ( i == patternArray.length - 1 ) {
//             patternArray[i] = input.substring(i, input.length)
//         } else patternArray[i] = (input.substring(i, i + 1))
//     }
//     arrPerm(patternArray);   
// }

//isPatternTwo(input, pattern);  
// entry point = main function,  aux function = recsursive part 
// geddeg 
//

let input = 'bluegreengreenblue';
let pattern = 'abba';

//part 2
const auxSearch = function (strMap, pattMap, str, strInd, patt, pattInd) {

    // Use both indices to break recursion
    if ( pattInd == patt.length && strInd == str.length ) {
        console.log('should be true');
        return true;
    }
    //If the above misses and either evalute to true, we've reached the end 
    if ( pattInd == patt.length || strInd == str.length ) return false;


    //Iterate through str to find substring
    for ( let i = strInd; i < str.length; i++ ) {
        let newStr = str.substring(strInd, i + 1);

        //If the indices exists in the map and its value equals the current string run recursion and increase index
        if ( pattMap[pattern[pattInd]] && pattMap[pattern[pattInd]] == newStr && strMap[newStr] && strMap[newStr] == patt[pattInd] ) {
            if ( auxSearch( strMap, pattMap, str, i + 1, patt, pattInd + 1) == true) return true;
        } 
        
        //If the values don't exist, add them and run recursion/increase index
        else if ( !pattMap[pattern[pattInd]] && !strMap[newStr] ) {

            if ( !strMap[newStr] && !pattMap[pattInd]) {
                pattMap[pattern[pattInd]] = newStr;
                strMap[newStr] = pattern[pattInd]; 

                if ( auxSearch( strMap, pattMap, str, i + 1, patt, pattInd + 1 ) == true ) return true;

                //delete the current map objects to backtrack
                delete pattMap[pattern[pattInd]];
                delete strMap[newStr];
            }
        }
    }
    return false;
}

const search = function (string, pattern) {
    let pattMap = {};
    let strMap = {};

    return auxSearch(strMap, pattMap, string, 0, pattern, 0);
}

console.log(search(input, pattern))
