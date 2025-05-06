import mongoose from "mongoose";
let schema=new mongoose.Schema({
    name:String,
    salary:Number,
    language:String,
    city:String,
    isManager:Boolean
})
export let DummyData=mongoose.model('DummyData',schema);