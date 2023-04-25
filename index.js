const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const db = require('./config/mongoose')
const passport = require('./config/passportLocalStrategy')
const passportJWT = require('./config/passportJWTStrategy')
const Result = require('./model/report')
const Student = require('./model/student')
const PORT = 8000
const app = express()

let counter = 0
app.use(cookieParser())
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(express.urlencoded())
app.use(express.json())
app.use(passport.initialize());
app.use(passport.session());
// app.use();
// custom middleware .....

app.use((req, res, next) => {
    counter++
    // console.log("The counter", counter )
    console.log("the session user",req.user, req.session.id, req.cookies)
    next()
})

const authMiddleware = async (req, res, next) => {
    console.log('the cookies', req.cookies)
    const student = await Student.findById(req.cookies.student)
    if(student){
        next()
    } else {
        return res.status(401).json({ message: "User not found"})
    }
}

const authMiddleware2 = async (req, res, next) => {

    console.log(req.cookies)
    let studentId, student
    if (req.cookies.user) {
        studentId = jwt.verify(req.cookies.user, 'test')
        student = await Student.findById(studentId)
    }
    if (student) {
        next()
    } else {
        return res.status(401).json({ message: "User not found"})
    }
}

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

app.use('/', require('./routes'))

app.get('/home', (req, res) => {
    return res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/student/:id', passport.authenticate('session', { failureRedirect: '/login'}) ,async (req, res) => {
    const id = req.params.id
    const student = await Student.findById(id)
    return res.status(200).json({
        message: "Student fetched successfully",
        data: student
    })
})

// app.get('/student', authMiddleware, async (req, res) => {

//     const students = await Student.find({}).populate('results')

//     return res.status(200).json({
//         message: "Student fetched successfully",
//         data: students
//     })

// })



app.post('/student', async (req, res) => {

    try {

        console.log("the data", req.body)

        const student = await Student.create(req.body)

        // students.push(req.body)
        return res.status(200).json({
            message: "Student fetched successfully",
            data: student
        })

    } catch(error) {

        console.log(error)
        return res.status(500).json({
            message: "Internal server error",
            data: null
        })

    }
    

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

app.post('/result', async (req, res) => {

    const result = await Result.create(req.body)

    const student = await Student.findById(req.body.student)

    student.results.push(result._id)
    // whenever we update the document manually we have to call the save method... 
    await student.save()

    return res.status(200).json({
        message: "Result fetched successfully",
        data: result
    })
})


app.get('/result', async (req, res) => {

    const results = await Result.find({}).populate('student')
    return res.status(200).json({
        message: "Result fetched successfully",
        data: results
    })
})


app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }) ,async (req, res) => {

    console.log("the user obj", req.user)
    const student = await Student.findOne({ email: req.body.email })
    if (student) {
        // res.cookie('student', student._id)
        return res.status(200).json({
            message: 'Student found successfully!',
            data: student
        })
    } else {
        return res.status(401).json({ message: "User not found"})
    }

})

app.post('/login/jwt', async (req, res) => {

    console.log(req.body)

    const student = await Student.findOne({ email: req.body.email })

    if(student) {

        const token = jwt.sign(student.id, 'test')
        // res.cookie('user', token)
        return res.status(200).json({
            message: "Student found successfully!",
            data: student,
            token: token
        })

    } else {
        return res.status(401).json({ message: "User not found"})
    }

})


app.listen(PORT, () => {
    console.log("Server successfully started!")
})

