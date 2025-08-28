import express from 'express'
import mongoose from 'mongoose'
import {User } from './model.js'
import cors from 'cors'
const app = express();
const PORT = 3000;

app.use(cors())


app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.post('/',async(req,res)=>{
    let newuser=new User(req.body);
    await newuser.save()
    console.log("Saved:", req.body);
    res.send("User saved to database");
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});