const {describe} = require('node:test');
const {outputAppend, outputWrite, outputReverse, outputInsertB, fizzbuzz} = require('./fizzbuzz');
// Testing
describe('Appending to an output', () => {
    test('Returns ["a","b"] for inputs ["a"],"b"', () => {
        expect(outputAppend(["a"],"b")).toEqual(["a","b"]);
    });
});
describe('Rewriting the output array', () => {
    test('Returns ["b"] for inputs ["a"],"b"', () => {
        expect(outputWrite(["a"],"b")).toEqual(["b"]);
    });
});
describe('Reverses the output array', () => {
    test('Returns ["b","a"] for inputs ["a","b"], ""', () => {
        expect(outputReverse(["a","b"],"")).toEqual(["b","a"]);
    });
    test('Returns an empty array when given an empty array', () => {
        expect(outputReverse([],"")).toEqual([]);
    });
    test('The input word does not effect the output, w="a" and w="b" give the same', () => {
        expect(outputReverse(["a"],"a")).toEqual(outputReverse(["a"],"b"));
    });
});
describe('Inserts a word into the output before any word starting in B', () => {
    test('Returns ["Fizz","Buzz"] for inputs ["Buzz"], "Fizz"', () => {
        expect(outputInsertB(["Buzz"],"Fizz")).toEqual(["Fizz","Buzz"]);
    });
    test('Returns ["Fizz"] for inputs [], "Fizz"', () => {
        expect(outputInsertB([],"Fizz")).toEqual(["Fizz"]);
    });
    test('Returns ["Fezz","Fuzz","Fizz","Bang"] for inputs ["Fezz","Fuzz","Bang"], "Fizz"', () => {
        expect(outputInsertB(["Fezz","Fuzz","Bang"], "Fizz")).toEqual(["Fezz","Fuzz","Fizz","Bang"]);
    });
    test('Returns ["Fizz"] for inputs [], "Fizz"', () => {
        expect(outputInsertB(["Fizz"],"Fizz")).toEqual(["Fizz","Fizz"]);
    });
});
describe('Runs FizzBuzz with specified command line arguments', () => {
    test('FizzBuzz should output 1 when given an endpoint >=1 with no command line arguments', () => {
        expect(fizzbuzz([],1, 1)).toEqual("1");
    });
    test('FizzBuzz should output Fizz for 3 with no command line arguments', () => {
        expect(fizzbuzz([],3, 3)).toEqual("Fizz");
    });
    test('FizzBuzz should output Buzz for 5 with no command line arguments', () => {
        expect(fizzbuzz([],5, 5)).toEqual("Buzz");
    });
    test('FizzBuzz should output FizzBuzz for 15 with no command line arguments', () => {
        expect(fizzbuzz([],15, 15)).toEqual("FizzBuzz");
    });
    test('FizzBuzz should output Bang for 7 with no command line arguments', () => {
        expect(fizzbuzz([],7, 7)).toEqual("Bang");
    });
    test('FizzBuzz should output FizzBuzzBang for 3*5*7=105 with no command line arguments', () => {
        expect(fizzbuzz([],105, 105)).toEqual("FizzBuzzBang");
    });
    test('FizzBuzz should output Bong for 11 with no command line arguments', () => {
        expect(fizzbuzz([],11, 11)).toEqual("Bong");
    });
    test('FizzBuzz should only output Bong for multiples of 11 (even if divisible by 3, 5, 7) with no command line arguments', () => {
        expect(fizzbuzz([],33, 33)).toEqual("Bong");
        expect(fizzbuzz([],55, 55)).toEqual("Bong");
        expect(fizzbuzz([],77, 77)).toEqual("Bong");
    });
    test('FizzBuzz should insert Fezz for multiples of 13 before the first B-prefixed word with no command line arguments', () => {
        expect(fizzbuzz([],13, 13)).toEqual("Fezz");
        expect(fizzbuzz([],65, 65)).toEqual("FezzBuzz");
        expect(fizzbuzz([],195, 195)).toEqual("FizzFezzBuzz");
    });
    test('FizzBuzz should reverse output word order for multiples of 17 with no command line arguments', () => {
        expect(fizzbuzz([],255, 255)).toEqual("BuzzFizz");
        expect(fizzbuzz([],51, 51)).toEqual("Fizz");
        expect(fizzbuzz([],17, 17)).toEqual("17");
    });
});