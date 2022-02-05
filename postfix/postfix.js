input = ""
// What edge cases Div by zero Empty stacks non int chars Empty string
//Exp operator Variables 
const postfixCalc = function ( input ) {
    let inpArr = input.split(" ");
    let stack = [];
    for (let i = 0; i < input.length; i++) {
        let curr = inpArr[i];
        if (curr == "+" || curr == "-" || curr == "*" || curr == "/") {
            let first = stack.pop();
            let second = stack.pop();
            if (curr == "+") stack.push((first + second))
            if ( curr == "-") stack.push((second - first))
            if ( curr == "*") stack.push((first * second))
            if ( curr == "/") stack.push((second / first));
        } else stack.push(parseInt(curr));
    }
    return stack[0]
}

console.log(postfixCalc(input))