const express = require('express')
const Student = require('../model/student')
const router = express.Router()

router.get('/', async (req, res) => {

    const students = await Student.find({}).populate('results')

    return res.status(200).json({
        message: "Student fetched successfully",
        data: students
    })

})

module.exports = router