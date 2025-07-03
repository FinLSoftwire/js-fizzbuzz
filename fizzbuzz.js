const prompt = require("prompt-sync")();
const { argv } = require('node:process');
const OutputOperation = require('./OutputOperation');
const outputAppend = function (arr, w) { return arr.concat([w]); }
const outputWrite = function (arr, w) { return [w]; }
const outputReverse = function(arr, w) { return arr.reverse(); }
const outputInsertB = function (arr, w) {
    if (arr.length === 0 || arr[0][0] === "B") {
        return [w].concat(arr);
    } else {
        // Take first instance of an element prefixed with B and insert before
        let firstBPrefix = 0;
        while (firstBPrefix < arr.length) {
            if (arr[++firstBPrefix][0] === "B")
                break;
        }
        // (workaround for lack of insert)
        if (firstBPrefix < arr.length)
            return arr.slice(0,firstBPrefix).concat([w]).concat(arr.slice(firstBPrefix));
        return arr.concat([w]);
    }
}

function toCapitalized(string) {
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
}

// This is our main function
function fizzbuzz() {
    // Store an array of numbers that have a rule in use
    let ruleArray = [];
    const ruleMap = new Map();
    ruleMap.set(3,new OutputOperation("Fizz", outputAppend));
    ruleMap.set(5,new OutputOperation("Buzz", outputAppend));
    ruleMap.set(7,new OutputOperation("Bang", outputAppend));
    ruleMap.set(11,new OutputOperation("Bong", outputWrite));
    ruleMap.set(13,new OutputOperation("Fezz", outputInsertB));
    ruleMap.set(17,new OutputOperation("", outputReverse));
    // Allowed arguments for toggling rules
    let argumentKeywords = [["3","Fizz"],["5","Buzz"],["7","Bang"],["11","Bong"],["13","Fezz"],["17"]]
    const ruleIndices = new Map();
    for (let index = 0; index < argumentKeywords.length; index++) {
        argumentKeywords[index].forEach(function (value) {
            ruleIndices.set(value, parseInt(argumentKeywords[index][0],10));
        });
    }
    // Take command line arguments to decide rules
    // Allow for either the number or word to be used as a command line argument
    // If no rules are specified, default to all
    if (argv.length <= 2 || argv[2] === "def") {
        ruleMap.forEach(function(operation, integerKey, map) {ruleArray.push(integerKey);});
    }
    // Specify rules first, then after 'def' specify definitions in format NUM RULE WORD
    if (argv.length > 2) {
        let argIndex = 2;
        let definingNew = false;
        while (argIndex < argv.length) {
            let value = argv[argIndex];
            if (definingNew) {
                // Extract number, rule, and (if not reversing) word
                if (argIndex >= argv.length-1)
                    throw new Error("Rule definition not provided.");
                let integerValue = parseInt(value,10);
                if (isNaN(integerValue))
                    throw new Error("Expected an integer value, found " + value + ".");
                if (ruleMap.has(integerValue))
                    throw new Error("Rule already defined.");
                let ruleType = argv[argIndex+1].toLowerCase();
                let word = "";
                if (ruleType !== "reverse") {
                    word = toCapitalized(argv[argIndex+2]);
                    if (argIndex >= argv.length-2)
                        throw new Error("Rule word not provided.");
                }
                let outputFunc = null;
                switch (ruleType) {
                    case "reverse": outputFunc = outputReverse; argIndex += 2;
                        break;
                    case "append": outputFunc = outputAppend; argIndex += 3;
                        break;
                    case "write": outputFunc = outputWrite; argIndex += 3;
                        break;
                    case "insert": outputFunc = outputInsertB; argIndex += 3;
                }
                ruleMap.set(integerValue, new OutputOperation(word,outputFunc));
                ruleArray.push(integerValue);
            } else {
                // Toggle defining mode
                if (value === "def") {
                    definingNew = true;
                    argIndex++;
                    continue;
                }
                // Enable the specified rule if valid
                const capitalizedValue = toCapitalized(value);
                if (ruleIndices.has(capitalizedValue))
                    ruleArray.push(ruleIndices.get(capitalizedValue));
                else
                    throw new Error("Value " + capitalizedValue + " is not recognized.");
                argIndex++;
            }
        }
    }
    // Sort the rules in ascending order
    ruleArray.sort(function (a,b) {return a-b; });
    let maxBoundInput = prompt("Insert a maximum number for FizzBuzz: ");
    let maxBound = 100;
    if (maxBoundInput.length > 0)
        maxBound = parseInt(maxBoundInput,10);
    for (let i = 1; i <= maxBound; i++) {
        let output = [];
        // If there is a rule for the number, then apply it to the output
        // Note that this means that any higher numbers may overwrite lower ones
        ruleArray.forEach(function(value, arr) {
            if (i % value === 0)
                output = ruleMap.get(value).runOp(output);
        });
        // If the output is empty (i.e. none of the criteria apply) then set output to the number
        if (output.length === 0)
            output = [i];
        // Concatenate all array elements into a single string
        console.log(output.join(""));
    }

}

// Now, we run the main function:
fizzbuzz();

module.exports = {
    outputAppend, outputWrite, outputReverse, outputInsertB
};