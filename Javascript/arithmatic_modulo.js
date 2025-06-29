var e = 12 % 8;
console.log(e);

//Dog age to human age convertor


const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the age of the dog: ',(dogAge)=>{
  var humanAge =((dogAge- 2) * 4 ) + 21;
  console.log(humanAge);
  rl.close();
})