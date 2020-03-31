const express = require('express')
const viewworkRoute = require ('./viewwork')
const contactRoute = require ('./contact')
const router = express.Router()

module.exports = () =>{
router.get('/', (request, response) =>{
    response.render('index', {pageTitle:'Welcome'})
});
router.use('./viewwork', viewworkRoute());
router.use('./contact', contactRoute());

return router;
}