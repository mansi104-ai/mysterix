// console.log("hello");
// console.log(2+3);
// console.log(typeof(23));
// console.log(typeof(true));

function test() {
    var a = "3";
    var b = "8";
    
/***********Do not change the code above 👆*******/
//Write your code on lines 7 - 


    var t = a;

    a  = b;

    b = t;

    
/***********Do not change the code below 👇*******/

    console.log("a is " + b);
    console.log("b is " + a);
}

// test();

function test2(){
  var message1 = "hello";
  var message2 = "world";

  var message = message1 + " " +message2;

  console.log(message);
}
message = "hello world";
test2();
console.log(message.length);