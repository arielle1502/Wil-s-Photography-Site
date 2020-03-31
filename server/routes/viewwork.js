const express = require('express')
const router = express.Router()

module.exports = () =>{
router.get('/', (req, res, next) =>{
    return response.render('index')
})

router.get('/:type', (req, res, next) =>{
    return response.render('landscapes')
})
return router;
}