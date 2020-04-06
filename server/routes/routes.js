const express = require('express')
const viewworkRoute = require ('./viewwork')
const contactRoute = require ('./contact')
const router = express.Router()

module.exports = (param) =>{

const {viewworkService} = param;
const {contactService} = param;

router.get('/', (req, res, next) =>{

    const viewwork = await viewworkService.getList();
    const allPhotos = await viewworkService.getAllPhotos();
    const usersFavouritePhoto = await personaliseService.getUsersFavouritePhoto("Arielle_Phillips");
    const favouritePhoto = await viewworkService.getPhotosForType(usersFavouritePhoto);
    return res.render('index', {page:'Home', viewwork, photos: favouriteArtistArtwork});

    
});
router.use('/viewwork', viewworkRoute(param));
router.use('/contact', contactRoute(param));

return router;
}