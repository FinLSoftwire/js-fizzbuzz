const prompt = require("prompt-sync")();
const { argv } = require('node:process');
// This is our main function
function fizzbuzz() {
    // Take command line arguments to decide rules
    // Allow for either the number or word to be used as a command line argument
    let rules = [true, true, true, true, true, true];
    let falseRuleSet = new Set([0,1,2,3,4,5]);
    let groupings = [["3","Fizz"],["5","Buzz"],["7","Bang"],["11","Bong"],["13","Fezz"],["17"]]
    const ruleMap = new Map();
    for (let index = 0; index < groupings.length; index++) {
        groupings[index].forEach(function (value) {
            ruleMap.set(value, index);
        });
    }
    // Set non-specified rules to false
    if (argv.length > 2) {
        argv.forEach(function(value, index) {
            // Ignore the first two arguments
            if (index > 1 && ruleMap.has(value)) {
                // If the argument is present, remove it from the false rule set
                falseRuleSet.delete(ruleMap.get(value));
            }
        });
        falseRuleSet.forEach(function (ruleIndex) {
            rules[ruleIndex] = false;
        });
    }
    let maxBoundInput = prompt("Insert a maximum number for FizzBuzz: ");
    let maxBound = 100;
    if (maxBoundInput.length > 0)
        maxBound = parseInt(maxBoundInput,10);
    for (let i = 1; i <= maxBound; i++) {
        let output = [];
        // All multiples of 3 add Fizz
        if (rules[0] && i % 3 === 0)
            output.push("Fizz");
        // All multiples of 3 add Buzz
        if (rules[1] && i % 5 === 0)
            output.push("Buzz");
        // All multiples of 7 add Bang
        if (rules[2] && i % 7 === 0)
            output.push("Bang");
        // Multiples of 11 override previous rules to only write Bong
        if (rules[3] && i % 11 === 0)
            output = ["Bong"]; // Overwrite - not concatenate
        // Multiples of 13 Insert Fezz before the first word beginning in B
        if (rules[4] && i % 13 === 0) {
            // Find the first word beginning with B
            if (output.length === 0 || output[0][0] === "B") {
                output = ["Fezz"].concat(output);
            } else {
                // Take tail of list and insert Fezz before it but after the head
                // (workaround for lack of insert)
                output = [output[0], "Fezz"].concat(output.slice(1));
            }
        }
        // Reverse the list for multiples of 17
        if (rules[5] && i % 17 === 0)
            output.reverse();
        // If the output is empty (i.e. none of the criteria apply) then set output to the number
        if (output.length === 0)
            output = [i];
        // Concatenate all array elements into a single string
        console.log(output.join(""));
    }

}

// Now, we run the main function:
fizzbuzz();

