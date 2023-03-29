const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema({
    grade: {
        type: String,
        required: true,
    },
    student: {
        type: mongoose.Types.ObjectId,
        ref: 'Student2'
    }
}, {
    timestamps: true
})

const Result = mongoose.model('Result', resultSchema)

module.exports = Result