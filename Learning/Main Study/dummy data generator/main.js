import express from 'express';
import { DummyData } from './models/dummyData.js';
import mongoose from 'mongoose';

const app=express();
const PORT=3000;
mongoose.connect('mongodb://localhost:27017/DummyData')
app.use(express.static('views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    res.render('index')
})
app.post('/add', async(req,res)=>{
    const sampleData = [
        { name: "Ali", salary: 50000, language: "JavaScript", city: "Lahore", isManager: true },
        { name: "Zara", salary: 60000, language: "Python", city: "Karachi", isManager: false },
        { name: "Usman", salary: 55000, language: "Java", city: "Islamabad", isManager: true },
        { name: "Fatima", salary: 45000, language: "C++", city: "Multan", isManager: false },
      ];
    
      await DummyData.insertMany(sampleData);
      res.redirect('/')
      alert("Dummy data added successfully")
})
app.post('/remove',async(req,res)=>{
    await DummyData.deleteMany()
    res.redirect('/')
})




app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})