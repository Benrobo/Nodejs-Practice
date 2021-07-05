const path = require("path")
const express = require("express")
const {router} = require('./TEMP ENGINE/router/routes')
const app = express()

// set view engine
app.set("views", path.join(__dirname, "TEMP ENGINE/views/"))
app.set("view engine", "ejs")

// server static f iles
app.use("/", express.static(path.join(__dirname, 'TEMP ENGINE/views')));

app.use("/", router)
app.use("/about", router)



app.listen(3000)