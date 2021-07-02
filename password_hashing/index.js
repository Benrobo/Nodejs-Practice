const crypto = require("crypto");

const genSalt = (size)=>{
    if(size < 10 || typeof size !== "number"){
        return {
            msg: `Size must br greather than 12 and must be a number`
        }
    }
    return crypto.randomBytes(Math.ceil( size / 2)).toString("hex").slice(0, size)
}

const password_hash = (password, salt)=>{
    if(password == null || salt == null){
        return {
            msg: "Password fieldmust be provided"
        }
    }
    let hash = crypto.createHmac("sha256", salt)
    hash.update(password)
    
    let hashval = hash.digest("hex")

    return {
        salt: salt, 
        hashedPwd: hashval
    }
}

const hash = (password,salt)=>{
    if (password == null || salt == null) {
        return ('Must Provide Password and salt values');
    }
    if (typeof password !== 'string' || typeof salt !== 'string') {
        return ('password must be a string and salt must either be a salt string or a number of rounds');
    }

    return password_hash(password,salt)
}

let salt = genSalt(12)


const password_verify = (password, hash) => {
    // This would be from database
    const {hashedPwd, salt} = {
        salt: 'cc6d4ed8383a',
        hashedPwd: 'de7adbe7ac57d957217eeb012aa70e52f8049caa8f30500fbc661dd7731de7f9'
    }

    let newpwd = password_hash(password, salt)

    if(newpwd.hashedPwd == hash){
        return true
    }
    else{
        return false
    }
}

console.log(password_verify("ben", "de7adbe7ac57d957217eeb012aa70e52f8049caa8f30500fbc661dd7731de7f9"))
