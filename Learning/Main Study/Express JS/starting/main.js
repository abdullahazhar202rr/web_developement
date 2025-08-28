import express from "express"
import fs from "fs"
const app = express()
const port = 3000
app.use(express.static("public"))
app.get('/', (req, res) => {
    // http://localhost:3000/?mode=dark
    if(req.query.mode=="dark"){
        res.send("Dark mode")
    }
    
    const data=fs.readFile("public/html.html", "utf-8", (err, data) => {
        if (err) throw err
        else res.send(data)
    })
})
app.get('/about/:slug', (req, res) => {
        res.send(`Hello ${req.params.slug}`)
    })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})