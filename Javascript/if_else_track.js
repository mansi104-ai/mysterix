const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function loveCalculate() {
  const n = Math.floor(Math.random() * 100) + 1;
  return n;
}

rl.question("Enter the name of the girl: ", (girlName) => {
  rl.question("Enter the name of the boy: ", (boyName) => {

    const love = loveCalculate();
    console.log(`${love} %`);


    if(love > 70){
      console.log('Best love');
    }else{
      console.log('Needs improvement!');
    }
    rl.close();
  });
});

