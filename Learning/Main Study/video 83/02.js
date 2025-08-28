let arr=Array.from({length:10},()=>Math.round(Math.random()*10));
console.log(arr)
let arr2=[]
unique={}
arr.forEach(i=>{
    if(!unique[i]){
        arr2.push(i,i);
        unique[i]=true;
    }
    })
arr2.sort((a,b)=>a-b);
console.log(arr2);