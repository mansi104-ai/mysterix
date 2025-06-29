const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

function bmiCalculator(weight, height) {
  const bmi = weight / Math.pow(height, 2);
  return Math.round(bmi);
}

async function main() {
  const weight = await askQuestion("Enter your weight in kg: ");
  const height = await askQuestion("Enter your height in m: ");

  const finBmi = bmiCalculator(parseFloat(weight), parseFloat(height));
  console.log(`Your BMI is: ${finBmi}`);
  if(finBmi < 18.5){
    console.log(`Your BMI is: ${finBmi} , so you are underweight`);
  }
  else if(finBmi>= 18.5 && finBmi <= 24.9){
    console.log(`Your BMI is: ${finBmi}, so you have a normal weight.`);
  }else{
    console.log( `Your BMI is ${finBmi}, so you are overweight.`)
  }
  rl.close();
}

main();
