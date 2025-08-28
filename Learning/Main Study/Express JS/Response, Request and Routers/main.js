import express from "express"
const app= express()
const port=3000

app.use(express.static("public"))
app.get("/",(req,res)=>{
    res.send("Hello World")
})
app.post("/",(req,res)=>{
    res.send("Hello World from post")
    console.log("Hello World from post")
})
app.put()

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })