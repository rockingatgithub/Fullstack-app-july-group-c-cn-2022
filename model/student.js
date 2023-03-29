const mongoose = require('mongoose')


const studentSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

const Student = mongoose.model('Student2', studentSchema)

module.exports = Student