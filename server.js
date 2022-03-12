const express = require('express')
const app = express()
const path = require('path')

const PORT = 6000
const {read, write} = require('./lib/FS.js')
app.use(express.json())


const authChecker = (req, res, next) =>{
    const {username, password} = req.headers

    const foundUser = read(path.resolve('./users.json'))
    const checkUser = foundUser.find(e => e.username == username && e.password == password)
    
    if(!checkUser){
        return res.status(404).send("This user doesn't exist!")
    }

    next()
}

app.get('/:city', authChecker, (req, res) => {
    const {city} = req.params
    const findCity = read(path.resolve('./weather.json'))
    console.log(findCity);
    res.send(findCity.filter(e => e.city == city))
})


app.listen(PORT, () => console.log(`You are in ${PORT} port`))