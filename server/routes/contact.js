// this is where all of the information that is submitted on the contact page is processed. The contact ejs page is rendered, and then the submission of data is passed to the data base once the addEntry function is called
const express = require('express')

const router = express.Router()

module.exports = (param) =>{

    const {contactService} = param;

router.get('/', async (req, res, next) =>{
   //Gets all of the contact info in the JSON file
   const contactlist = await contactService.getList();
   try{
       //Renders the page and passes in the contact data
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

//If there is a validation error then the contact page is reloaded

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

// a redirect to show the user that their submission was successful will be located in the URL bar
return res.redirect('/contact?success=true')
}catch(err){
return next(err);
}
});

return router;
}