const express = require('express')
const path = require('path')

const routes = require('./routes/routes.js')

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))

app.use(express.static(path.join(__dirname, './static')))

app.use('/', routes())


app.get('/landscapes', (request, response)=>{
    response.sendFile(path.join(__dirname, './static/landscapes.html'))
})
app.get('/street', (request, response)=>{
    response.sendFile(path.join(__dirname, './static/street.html'))
})
app.get('/flora&fauna', (request, response)=>{
    response.sendFile(path.join(__dirname, './static/flora&fauna.html'))
})
app.listen(port, () =>{
    console.log(`express server listening on port ${port}`)
})