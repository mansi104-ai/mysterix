var guestlist = ['aa','bb','cc','dd','ee','ff'];

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  const name_g = await askQuestion("Input your name: ");

  if(guestlist.includes(name_g)){
    console.log("Welcome!");
  }else{
    console.log("Next time maybe!");
  }

  rl.close();
}

main();