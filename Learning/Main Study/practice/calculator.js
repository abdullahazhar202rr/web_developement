/* Create a faulty calculator using JavaScript

This faulty calculator does following:
1. It takes two numbers as input from the user
2. It perfoms wrong operations as follows:

+ ---> -
* ---> +
- ---> /
/ ---> **


It performs wrong operation 10% of the times

*/
let rand=Math.random()
let a=prompt("Enter your First Number")
let c=prompt("Enter -,+,*,/")
let b=prompt("Enter your Second Number")
let obj={
    "+": "-",
    "*": "+",
    "-": "/",
    "/": "**",
}
if(rand<0.1){
    console.log(`The result of ${a} ${c} ${b} is ${eval(`${a} ${c} ${b}`)}`)
    alert(`The result is ${eval(`${a} ${c} ${b}`)}`)
}
else{
    c=obj[c]
    console.log(`The result of ${a} ${c} ${b} is ${eval(`${a} ${c} ${b}`)}`)
    alert(`The result is ${eval(`${a} ${c} ${b}`)}`)
    
}
