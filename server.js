const express = require("express")
const employeesRoutes = require("./routes/employees")
const mongoose = require("mongoose")
const authRoute=require("./routes/auth.route")
require('./helpers/extend-node-input-validator')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const SERVER_PORT = 3001

app.use(bodyParser.json())
app.use(cors())

const DB_CONNECTION_STRING ="mongodb+srv://sa:Arnur2020!@cluster0.iuutn48.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority" 
mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
app.use("", employeesRoutes)

app.use('', authRoute)


app.route("/")
    .get((req, res) => {
        res.send("<h1>Assignment 1</h1>")
    })

app.listen(SERVER_PORT, () =>{
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})

