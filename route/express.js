const express = require("express")

const app = express()

app.get("/", (req, res)=>{
    res.send("Home Page")
})

app.post("/upload", (req, res)=>{
    res.send("post route")
})

app.listen(5000)