const express = require('express')

const router = express.Router()

module.exports = (param) =>{

    const {contactService} = param;

router.get('/', async (req, res, next) =>{
   //Gets all of the contact info in the JSON file
   const contactlist = await contactService.getList();
   try{
       //Renders the page and passes in the contact data
       //success: req.query.success - Check if the form has been submitted successfully
       //Now in the template we can check if it was successful or not
       return res.render('contact', {
           page: 'Contact',
           contactlist,
           success: req.query.success,
       });
   }catch(err){
       return err;
   }
});


router.post('/', async(req, res, next) => {

try {
console.log(req.body)
const contactlist = await contactService.getList(); //Pull in feedback data from JSON

//Trim() Makes sure there is no unnecessary white space;
const conName = req.body.conName.trim();
const conEmail = req.body.conEmail.trim();
const conMessage = req.body.conMessage.trim();

//If there is a validation error then we want to reload the contact page
//We also want to populate the fields that were filled in correctly
//This way they don't have to retype everything
if(!conName || !conEmail || !conMessage){
   return res.render('contact', 
   {
       page: 'Contact',
       error: true,
       conName,
       conEmail,
       conMessage,
       contactlist
   });
}
//Call the addEntry function and write the data
await contactService.addEntry(conName, conEmail, conMessage);

//Now we want to send the users to a page that indicates they have submitted successfully
//To do this we will use a redirect
return res.redirect('/contact?success=true')
}catch(err){
return next(err);
}
});

return router;
}