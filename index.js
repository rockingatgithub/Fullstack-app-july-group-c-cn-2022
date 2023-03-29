const express = require('express')
const path = require('path')
const db = require('./config/mongoose')
const Student = require('./model/student')
const PORT = 8000
const app = express()

let counter = 0
app.use(express.urlencoded())
app.use(express.json())

// custom middleware .....

app.use((req, res, next) => {
    counter++
    console.log("The counter", counter)
    next()
})

// CRUD API

const students = [
    {
        name: "shekhar",
        roll: 23
    },
    {
        name: "nilesh",
        roll: 25
    },
    {
        name: "nazim",
        roll: 20
    },
    {
        name: "prem",
        roll: 21
    },
]

app.get('/home', (req, res) => {
    return res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/student/:id',async (req, res) => {
    const id = req.params.id
    const student = await Student.findById(id)
    return res.status(200).json({
        message: "Student fetched successfully",
        data: student
    })
})

app.get('/student', async (req, res) => {

    const students = await Student.find({})

    return res.status(200).json({
        message: "Student fetched successfully",
        data: students
    })

})



app.post('/student', async (req, res) => {

    console.log("the data", req.body)

    const student = await Student.create(req.body)

    // students.push(req.body)
    return res.status(200).json({
        message: "Student fetched successfully",
        data: student
    })

})

app.put('/student', async (req, res) => {
    const email = req.query.email

    // const index = students.findIndex((student) => student.roll === rollNo)
    // if(index != -1) {
    //     students.splice(index, 1, req.body)
    //     return res.status(200).json({
    //         message: "Student fetched successfully",
    //         data: students
    //     })
    // }

    const student = await Student.findOneAndUpdate({email: email}, req.body, { new: true })

    if (student) {
        return res.status(200).json({
                message: "Student fetched successfully",
                data: student
        })
    }

    return res.status(400).json({
        message: "can't find student",
        data: null
    })

})




app.listen(PORT, () => {
    console.log("Server successfully started!")
})

