let fs=require("fs")
// fs.writeFile("task1.js","This is task 1",()=>{
//     console.log("File created successfully")
// })
// fs.unlink("task1.js",()=>{
//     console.log("File deleted successfully")
// })
// fs.writeFile("task1.txt","This is task 1",()=>{
//     console.log("File created successfully")
// })
fs.appendFile("task1.txt","\nThis is task 1",()=>{
    console.log("File appended successfully")
})
fs.readdir()
