import express from "express"
import { todo } from "./models/todo.js"
import mongoose from "mongoose"

 const app=express()
 const port =3000

 mongoose.connect("mongodb://localhost:27017/Todo")
app.get("/",async(req,res)=>{
    const newtodo = new todo({name:"Abdullah", age:19,FName:"Azhar Iqbal"})
    await newtodo.save()
    res.send("Hello The Data is saved")

})


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
  })