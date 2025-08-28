import mongoose from "mongoose";

let schema= mongoose.Schema({
    name:String,
    age:Number,
    FName:String,
})

export let todo = mongoose.model('Todo',schema)