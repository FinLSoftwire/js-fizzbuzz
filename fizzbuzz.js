// This is our main function
function fizzbuzz() {
    for (let i = 1; i <= 100; i++) {
        let output = "";
        if (i % 3 === 0) {
            output = "Fizz";
            if (i % 5 === 0)
                output += "Buzz";
        } else if (i % 5 === 0) {
            output = "Buzz";
        } else {
            output = i;
        }
        console.log(output);
    }

}

// Now, we run the main function:
fizzbuzz();

