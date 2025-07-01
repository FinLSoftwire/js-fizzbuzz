// This is our main function
function fizzbuzz() {
    for (let i = 1; i <= 100; i++) {
        let output = [];
        // All multiples of 3 add Fizz
        if (i % 3 === 0)
            output.push("Fizz");
        // All multiples of 3 add Buzz
        if (i % 5 === 0)
            output.push("Buzz");
        // All multiples of 7 add Bang
        if (i % 7 === 0)
            output.push("Bang");
        // Multiples of 11 override previous rules to only write Bong
        if (i % 11 === 0)
            output = ["Bong"]; // Overwrite - not concatenate
        // Multiples of 13 Insert Fezz before the first word beginning in B
        if (i % 13 === 0) {
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
        if (i % 17 === 0)
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

