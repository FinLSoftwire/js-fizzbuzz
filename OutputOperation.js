class OutputOperation {
    constructor(word, op) {
        this.word = word;
        this.op = op;
    }
    runOp(arr) {
        return this.op(arr, this.word);
    }
}

module.exports = OutputOperation;