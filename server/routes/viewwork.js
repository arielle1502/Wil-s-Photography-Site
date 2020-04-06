const express = require('express')
const router = express.Router()

module.exports = (param) =>{

    const {viewworkService} = param;

// router.get('/', async (req, res, next) =>{
//     const viewwork = await viewworkService.getList();
//     const allPhotos = await viewworkService.getAllPhotos();

//     return res.render('index', {page:'Home', viewwork, photos:allPhotos});
// })

router.get('/:type', async (req, res, next) =>{

try{
    const promises = []; //Creates a empty array
            promises.push(viewworkService.getOnetype(req.params.type)); //This pushes our first promise into the empty array
            promises.push(viewworkService.getPhotosForType(req.params.type)); //This pushes our second promise into the array
            const result = await Promise.all(promises) //This waits for both promises to finish and returns the result in an array

            //If the no data is returned 
            if(!result[0]){
                return next();
}

   //Renders the page and passes in the data as JSON
        return res.render('typeDetail', {
            page: req.params.type, 
            type: result[0],
            photos: result[1],
        });
    }catch (err){
        return next(err);
    }

});
return router;
}