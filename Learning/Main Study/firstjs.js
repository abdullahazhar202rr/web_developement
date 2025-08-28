// alert("Hello World")
// document.body.style.backgroundColor="red"
console.log("Hello World")
var a=3;
{
    let a=5;
    console.log(a)
}
console.log(a)
const b=undefined
console.log(b)
let dict={
    name: "Abdullah",
    age: 19,
}
for (const key in dict) {
        const element = dict[key];
        console.log(key, element)
        console.log(typeof key, typeof element)
    }
let i=1;
while (i<5) {
    console.log(i);
    i++;
}
console.log(i);