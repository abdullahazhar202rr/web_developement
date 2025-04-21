import express from "express"
import fs from "fs"
const app = express()
const port = 3000

app.use(express.static("public"))
// Middleware to log request details
app.use((req, res, next) => {
    const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`
    fs.appendFile("requests.log", log, (err) => {console.log(err)})
    next()
})

app.get('/:slug', (req, res) => {
        res.send(`Hello ${req.params.slug}`)
    })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})