const express = require('express')

const contactRoute = require ('./contact')
const router = express.Router()

module.exports = (param) =>{

const {viewworkService} = param;
const { personaliseService } = param;


router.get('/', async(req, res, next) =>{

    const viewworkList = await viewworkService.getList();
    const allPhotos = await viewworkService.getAllPhotos();
    
    const usersFavouritePhoto = await personaliseService.getUsersFavouritePhoto("Arielle_Phillips");
    
    console.log(usersFavouritePhoto);
    return res.render('index', {page:'Home', viewworkList, photos: allPhotos, photo: usersFavouritePhoto});

    
});
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

router.use('/contact', contactRoute(param));

return router;
}