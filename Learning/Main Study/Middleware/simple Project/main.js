import express from "express"
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.static("Public"))

app.get("/",(req,res)=>{
    res.sendFile("index.html")
    
})
app.post("/submit", (req, res) => {
    let input=req.body.search
    input=input.trim()
    res.redirect(`/submit/${input}`)
})
app.get("/submit/:slug", (req, res) => {
    let input=req.params.slug
    res.send(`<h2>Welcome to the page for: ${input}</h2>`)
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})