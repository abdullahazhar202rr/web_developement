import express from "express"
import fs from "fs/promises"

let app = express()
const port = 3000

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.render("index")
})


app.post("/",async (req,res)=>{
    let name=req.body.name
    let email = req.body.email
    let password = req.body.password
    try{
        await fs.appendFile("data.txt", `Name: ${name}, Email: ${email}, Password: ${password}\n`)
        res.send("Data saved successfully")
    }catch(err){
        res.status(500).send("Error writing to file")
    }
})
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
