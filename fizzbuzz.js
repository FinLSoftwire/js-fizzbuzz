// This is our main function
function fizzbuzz() {
    for (let i = 1; i <= 100; i++) {
        let output = [];
        if (i % 3 === 0)
            output.push("Fizz");
        if (i % 5 === 0)
            output.push("Buzz");
        if (i % 7 === 0)
            output.push("Bang");
        if (i % 11 === 0)
            output = ["Bong"]; // Overwrite - not concatenate
        if (i % 13 === 0) {
            // Find the first word beginning with B
            if (output.length === 0 || output[0][0] === "B") {
                output = ["Fezz"].concat(output);
            } else {
                // Take tail of list and insert Fezz before it but after the head
                output = [output[0], "Fezz"].concat(output.slice(1));
            }
        }
        if (i % 17 === 0) {
            // Reverse
        }
        // If the output is empty (i.e. none of the criteria apply) then set output to the number
        if (output.length === 0)
            output = [i];
        // Concatenate all array elements into a single string
        console.log(output.join(""));
    }

}

// Now, we run the main function:
fizzbuzz();

