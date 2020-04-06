const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const configs = require('./server/config')
const createErrors = require('http-errors');
const routes = require('./server/routes/routes');

const ViewworkService = require('./server/services/ViewworkService'); 
const ContactService = require('./server/services/ContactService'); 

const app = express();
const config = configs[ app.get('env') ]

const viewworkService = new ViewworkService(config.data.viewwork); 
const contactService = new ContactService(config.data.contact); 

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './server/views'))
app.use(express.static(path.join(__dirname, './public')))

app.use(bodyParser.urlencoded({extended: true}));

//Gets the speakers names for the menu
app.use(async (req, res, next) => {
    try {
        const types = await viewworkService.getAlltypes();
        res.locals.viewworkTypes = types;
        return next();
    }catch(err){
        return next(err);
    }
});

app.use('/', routes({
    viewworkService: viewworkService,
    contactService: contactService,
    personaliseService: personaliseService
}));



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
