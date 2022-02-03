require('dotenv').config()//we set our enviromental variables
const http = require('http')//http server
const express = require('express')//express
const cors = require('cors')//cors middleware


//create server instance
const app = express()
const httpServer = http.createServer(app)


//launch server
httpServer.listen(process.env.PORT, () => {
    console.log(`app running on port: ${process.env.PORT}`)
})

//general purpose middleware declarations
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//API ROUTES
const api_routes = require('./routes/api-routes')
app.use('/api', api_routes)