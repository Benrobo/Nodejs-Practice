const http = require("http")
const fs = require("fs")
const url = require("url");
const mysql = require("mysql")
const path = require("path")
const express = require("express")
const bodyParser = require('body-parser'); 

// create an express app
const app = express()

const dbOp = {
    host: "localhost",
    user: "root",
    password: null,
    database: "NodejsDb"
}

const conn = mysql.createConnection(dbOp)


conn.connect((err)=>{
    if(err){
        return console.log(err)
    }
})

// middleware
app.use("/static", express.static(path.join(__dirname, "views")))

// Third party middleware to extract from data passed from client to server and append those data to the req.body object
app.use(bodyParser.json()); 

app.get("/api/getUser", (req, res)=>{
    getData(res)
})

app.post("/api/", (req, res)=>{
    // postData(res)
    // res.send(req.body.name)
   postData(res, req.body.name)
})


app.post("/api/editCont/:id", (req, res)=>{
   editData(res, req.body.newinpval, req.params.id)
})

app.post("/api/delCont/:id", (req, res)=>{
    delData(res, req.params.id)
})

// Get data from server
function getData(res){
    const sql = "SELECT * FROM user_table"
    conn.query(sql, (err, data)=>{
        if(err){
           return console.log(err)
        }
        res.send(JSON.stringify(data))
    })
}

// Post data From client
function postData(res, data){

    const sql = `INSERT INTO user_table(name) VALUES('${data}')`
    conn.query(sql, (err, data)=>{
        if(err){
           return console.log(err)
        }
        res.send(JSON.stringify({msg: "UPLOADED"}))
    })
}

// Edit data passed from client to server
function editData(res, val, id){

    if(val== ""){
        return res.send(JSON.stringify({msg: "Empty Input"}))
    }

    const sql = `UPDATE user_table SET name='${val}' WHERE id=${id}`
    conn.query(sql, (err, data)=>{
        if(err){
           return console.log(err)
        }
        res.send(JSON.stringify({msg: "Td Content Edited"}))
    })
}

function delData(res, id){

    if(id== ""){
        return res.send(JSON.stringify({msg: "Data does not exist"}))
    }

    const sql = `DELETE FROM user_table WHERE id=${id}`
    conn.query(sql, (err, data)=>{
        if(err){
           return console.log(err)
        }
        res.send(JSON.stringify({msg: "Content Deleted"}))
    })
}

// express app serve at given port
app.listen(5000)