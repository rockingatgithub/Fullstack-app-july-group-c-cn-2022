const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/new_express_db')
mongoose.connect(process.env.DB_URL)

const db = mongoose.connection

db.once('open', () => {
    console.log("DB connected successfully!")
})

module.exports = db