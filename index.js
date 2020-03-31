const express = require('express');
const path = require('path');
const app = express();

const createErrors = require('http-errors');


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))

app.use(express.static(path.join(__dirname, './public')))




const routes = require('./server/routes/routes');
app.use(express.static('static'));
app.use('/', routes());


// app.get('/landscapes', (request, response)=>{
//     response.sendFile(path.join(__dirname, './static/landscapes.html'))
// })
// app.get('/street', (request, response)=>{
//     response.sendFile(path.join(__dirname, './static/street.html'))
// })
// app.get('/flora&fauna', (request, response)=>{
//     response.sendFile(path.join(__dirname, './static/flora&fauna.html'))
// })

app.use((req, res, next) => {
    return next(createErrors(404, 'File Not Found'));
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    const status = err.status || 500;
    res.locals.status = status;
    res.locals.error = req.app.get('env') === 'develoment' ? err : {};
    console.log(err);
    res.status(status);

    return res.render('error');

});

app.listen(3000);

module.exports = app;
