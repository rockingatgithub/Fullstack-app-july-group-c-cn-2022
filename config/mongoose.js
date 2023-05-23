const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/new_express_db')
mongoose.connect('mongodb+srv://sudhendra:saNwJ6VWAZDYN6pX@cluster0.4j2hn4g.mongodb.net/?retryWrites=true&w=majority')

const db = mongoose.connection

db.once('open', () => {
    console.log("DB connected successfully!")
})

module.exports = db