const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function bmiCalculator(weight, height){
  var bmi = weight / Math.pow(height,2);
  return Math.round(bmi);
}

rl.question("Enter your weight in kg: ",(weight)=>{
  rl.question("Enter your height in m: ",(height)=>{

    var finBmi = bmiCalculator(weight, height);
    console.log("Your bmi is : "+ finBmi);
    rl.close();
  }
);
});
