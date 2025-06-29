var name_me  = "Mansi";
// console.log(name_me.slice(0,2));


/* This does not work in the lastest environemts like vs code and node js */
// var tweet = prompt("Compose your tweet :");
// var tweetunder140 = tweet.slice(0,140);
// console.log(tweetunder140);


const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output : process.stdout
});

rl.question('Compose your tweet :', (tweet) =>{
  const tweetunder140 = tweet.slice(0,140);
  console.log(`Your tweet: ${tweetunder140}`);
  console.log(`Characters used: ${tweetunder140.length}/140`);
  rl.close();
})