var name_me = "Angela";
console.log(name_me.toUpperCase());

// Enter your favourite language and if it is javascript , then good else bad 
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your favourite language: ',(lang) =>{
  if(lang.toLowerCase() !== 'javascript'){
    console.log('Bad!');
  }else{
    console.log('Good!');
  }
  rl.close();
}
)