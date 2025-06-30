function Fibonacci(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return Fibonacci(n - 1) + Fibonacci(n - 2);
}


function main() {
  const limit = 10;
  const output = [];

  for (let num = 0; num < limit; num++) {
    output.push(Fibonacci(num));
  }

  console.log(output);
}

main();
