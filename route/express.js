const express = require("express")
const path = require("path")

// create an express app
const app = express()




// create server
const port =  5000

// serving static files
// app.use(express.static("views"))

// adding prefix to the middleware function. we can create a virtual path prefix in the use() function which would lookup from the express.static() method, when we dont wanna let the user know that our files are been served from a folder called static

// app.use("/static", express.static("views"))

// or

app.use("/static", express.static(path.join(__dirname, "views")))

// if we dont wanna 
app.get("/", (req, res)=>{
    res.send("HOME PAGE")
})


app.listen(port)