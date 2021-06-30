const myql = require("mysql")


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
