const http = require("http")
const fs = require("fs")
const url = require("url");
const mysql = require("mysql")
const path = require("path")
const mime = require("mime-types");

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





let server = http.createServer((req, res)=>{
    if(req.url == "/"){
        fs.readFile(_dirname + "/views/index.html", (err, data)=>{
            if(err){
                return console.log(err)
            }
            res.end(data)
        })
    }

    else if(req.url == "/api" && req.method == "POST"){

        req.on("data", (data)=>{
            let user = JSON.parse(data.toString()).name

            insertData(user)
        })


        function insertData(data){
            let username = data
            const sql = `INSERT INTO user_table(name) VALUES('${data}')`

            conn.query(sql, (err, data)=>{
                if(err){
                    return console.log(err)
                }
                console.log("data inserted")
                res.end("success")
                // saveData(data)
            })
        }
    }

    else if(req.url === "/getData" && req.method == "GET"){
        const sql = "SELECT * FROM user_table"
            
        conn.query(sql, (err, data)=>{
            if(err){
                return console.log(err)
            }
            // res.writeHead(200, { "Content-Type" : "application/json" })
            res.write(JSON.stringify(data))
        })
    }


})

server.listen(5000)


function saveData(data){
    fs.writeFile("data.json", JSON.stringify(data), (err)=>{
        if(err){
            return console.log(data)
        }

        console.log("Record saved")
    })
}