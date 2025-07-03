const {describe} = require('node:test');
const {outputAppend, outputWrite, outputReverse, outputInsertB} = require('./fizzbuzz');
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
});