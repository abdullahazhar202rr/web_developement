import mongoose from "mongoose";
let schema={
    username:String,
    email:String,
    password:String,
    confirm_password:String,
}
export let userinfo=mongoose.model('userinfo',schema)