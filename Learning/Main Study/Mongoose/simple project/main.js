import express from "express"
import { userinfo } from "./models/userinfo.js"
import mongoose from "mongoose"
import path from "path"

 const app=express()
 const port =3000
app.use(express.urlencoded({extended:true}))
 mongoose.connect("mongodb://localhost:27017/Todo")
let __dirname=path.resolve()
app.post("/submit",async(req,res)=>{
    let {name, email,password} = req.body
    const newuserinfo= userinfo({name:name, email:email,password:password})
    await newuserinfo.save()
    res.send("Saved File")
})
app.get("/",async(req,res)=>{
    
    res.sendFile("./public/index.html",{root:__dirname})

})


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
  })