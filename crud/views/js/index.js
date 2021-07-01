let inpedit = document.querySelector(".inp-edit")
let inp = document.querySelector(".inp")
let btn = document.querySelector(".send")
let getbtn = document.querySelector(".getbtn")
let ovl = document.querySelector(".modal-cont")

btn.addEventListener("click", (e)=>{
    e.preventDefault()

    sendData()
})

async function sendData(){
    
    if(inp.value == ""){
        alert("empty fields")
        return
    }
    let value = { 
        "name": inp.value, 
    }


    let res = await fetch("/api/",{
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body : JSON.stringify(value)
    })
    let data = await res.json()

    if(data){
        let {msg} = data
        alert(msg)
        window.location.reload(2)
    }
}


async function fetchData(){
    let res = await fetch("/api/getUser")
    let data = await res.json()
    return data
}

async function appendData(){
    let div = document.querySelector(".data")
    let data = await fetchData()

    if(data == ""){
        let tr = document.createElement("tr")
        tr.innerHTML = `
            <td>No data Available Try Adding Data</td>
        `
        div.appendChild(tr)
        return
    }
    data.forEach((e)=>{
        let tr = document.createElement("tr")
        tr.innerHTML = `
            <td>${e.id}</td>
            <div class="clear-fix">
            <div class="float-left">
            <td class="td-cont"><span class="name">${e.name}</span> 
            </div>
            <div class="float-right">
            <button class="btn btn-primary edit" data-id="${e.id}">edit</button> <button class="btn btn-danger del" data-id="${e.id}">del</button></td>
            </div>
            </div>
        `
        div.appendChild(tr)
        // The below function would be called when this data is appended into the body
        editData()
        delData()
    })
}
appendData()


function editData(){
    let editbtn = document.querySelectorAll(".edit")
    editbtn.forEach((tdbtn)=>{
        tdbtn.onclick = (e)=>{
            ovl.style.display = "flex"
            let id = e.target.getAttribute("data-id")
            let tdcont = e.target.parentElement.parentElement.querySelector(".name").textContent
            
            inpedit.setAttribute("data-id", id)
            inpedit.value = tdcont

            editTdElem(id)
        }
    })
}
editData()


function editTdElem(id){
    let savebtn = document.querySelector(".savebtn")
    let cancelbtn = document.querySelector(".cancelbtn")
    
    savebtn.onclick = async (e)=>{
        let newinpval = inpedit.value
        let res = await fetch(`/api/editCont/${id}`,{
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body : JSON.stringify({newinpval,id})
        })
        let data = await res.json()

        if(data){
            let {msg} = data
            alert(msg)
            window.location.reload(2)
        }
    }

    cancelbtn.onclick = (e)=>{
        ovl.style.display = "none"
    }
}


function delData(){
    let delbtn = document.querySelectorAll(".del")
    delbtn.forEach((del)=>{
        del.onclick = (e)=>{
            let id = e.target.getAttribute("data-id")
            console.log(id)
            delTdElem(id)
        }
    })
    async function delTdElem(id){
        let res = await fetch(`/api/delCont/${id}`,{
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body : JSON.stringify({id})
        })
        let data = await res.json()

        if(data){
            let {msg} = data
            alert(msg)
            window.location.reload(2)
        }
    }
}
