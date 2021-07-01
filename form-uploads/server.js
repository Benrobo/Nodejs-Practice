const http = require("http")
const path = require("path")
const fs = require("fs")
const Formidable = require("formidable")


const rand = Math.floor(Math.random() * 349700 +1)
let server = http.createServer((req, res)=>{
    if(req.url == "/"){
        fs.readFile("index.html", (err, data)=>{
            if(err) throw err

            res.end(data)
        })
    }
    else if (req.url == "/uploads"){
        const form = Formidable.IncomingForm()
        form.parse(req, (err, fields, files)=>{
            let oldp = files.file.path;
            let newp = files.file.name;
            let ext = path.extname(newp)
            let newfilename = newp.replace(newp, `${rand}${ext}`)
            
            fs.rename(oldp, `uploads/${newfilename}`, (err)=>{
                res.end("File Uploaded")
            })
        })
    }else{
        console.log("error")
        res.end()
    }
})

server.listen(5000)