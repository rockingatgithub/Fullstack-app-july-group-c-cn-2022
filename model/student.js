const mongoose = require('mongoose')

const candidateSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    interviews: [{
        type: mongoose.Types.ObjectId,
        ref: 'Interview'
    }]

})

const Candidate = mongoose.model('Candidate', candidateSchema)
module.exports = Candidate



