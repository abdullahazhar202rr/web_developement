import fs from "fs/promises"
let a =await fs.writeFile("Abdullah.txt","I am Abdullah Azhar",()=>{
    console.log("Task done!!!")
})