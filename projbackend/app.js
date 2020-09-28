const mongoose = require('mongoose')
const express = require('express')
const app = express()
require('dotenv').config()
// middlewares - 3
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

// routes
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const categoryRoute = require('./routes/category')
const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')
const stripeRoute = require('./routes/stripepayment')


// 27107 is the default port where mongodb is listening on -> to see open terminal and type 'mongod' to see the port number. If connection failed run 'mongod' in the terminal.

// DB connection
mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex : true
    }
).then(() => console.log(`DB CONNECTED TO -> ${process.env.DATABASE}`))
    .catch(() => {
        console.log('OOPS')
    })
    
//Using middleware in our app
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//Routes
app.use('/api', authRoute)
app.use('/api', userRoute)
app.use('/api', categoryRoute)
app.use('/api', productRoute)
app.use('/api', orderRoute)
app.use('/api', stripeRoute)
// Port
const port = 5000

//Startina a server
app.listen(port, () => {
    console.log(`App is listening at ${port}`)
})
