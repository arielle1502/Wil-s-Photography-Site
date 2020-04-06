const express = require('express')
const viewworkRoute = require ('./viewwork')
const contactRoute = require ('./contact')
const router = express.Router()

module.exports = (param) =>{

const {viewworkService} = param;
const { personaliseService } = param;


router.get('/', async(req, res, next) =>{

    const viewworkList = await viewworkService.getList();
    const allPhotos = await viewworkService.getAllPhotos();
    
    const usersFavouritePhoto = await personaliseService.getUsersFavouritePhoto("Arielle_Phillips");
    const favouritePhoto = await viewworkService.getAllPhotos(usersFavouritePhoto);
    console.log(favouritePhoto);
    return res.render('index', {page:'Home', viewworkList, allPhotos, photo: favouritePhoto});

    
});
router.use('/viewwork', viewworkRoute(param));
router.use('/contact', contactRoute(param));

return router;
}