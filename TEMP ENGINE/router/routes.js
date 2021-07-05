const express = require("express")
const app = express()
const router = express.Router()
const router404 = express.Router()

router.get("/", (req, res)=>{
    res.render("index", {
        title: "home page",
        content: "home page content"
    })
})

router.get("/about", (req, res)=>{
    res.render("about", {
        title: "about page",
        content: "about page content"
    })
})

router.delete("/", (req, res)=>{
    console.log("Delete Router");
})

router404.get("*", (req, res)=>{
    res.send("Sorry cannot get " + req.params["0"])
    console.log(req.params["0"])
})


module.exports = {
    router,
    router404
}