const express = require('express')

const router = express.Router()

module.exports = () =>{
router.get('/', (req, res, next) =>{
    return response.send('Contact Page')
})

router.post('/', (req, res, next) =>{
    return response.send('Feedback form posted')
})
return router;
}