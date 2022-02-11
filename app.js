require('dotenv').config()//we set our enviromental variables
const http = require('http')//http server
const express = require('express')//express
const cors = require('cors')//cors middleware
const mongoose = require('mongoose')

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

//CONNECT DB
mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?authSource=admin&authMechanism=SCRAM-SHA-256&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`).then(()=>console.log('mongodb connected...'))


//API ROUTES
const api_routes = require('./routes/api-routes')
app.use('/api', api_routes)

//START BROWSER
const { startBrowser } = require('./puppeteer/browser')
startBrowser().then(browser => global.browser = browser)
global.tabs = 0

