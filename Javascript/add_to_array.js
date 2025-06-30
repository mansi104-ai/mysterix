const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const output = [];

function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

function FizzBuzz(num) {
  for (let i = 1; i <= num; i++) {
    output.push(i);
  }
  console.log(output);
}



main();
