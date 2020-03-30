const express = require('express')

const router = express.Router()

module.exports = () =>{
router.get('/', (request, response) =>{
    return response.send('View Work')
})

router.get('/:phototype', (request, response) =>{
    return response.send(`Detail page of ${request.params.phototype}`)
})
return router;
}