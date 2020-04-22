// Personalise Service Class's purpose is to load the data from users.json and sort through to find the users most viewed photo. All data is loaded into the variable 'data', and the variable 'user' hold the users information that was loacted through the user's shortname
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

//New Class
class PersonaliseService {
  //Passes the data into the constructor 
  constructor(datafile) {
    this.datafile = datafile;
  }
  //Returns a list of all the data
  async getList() {
    const data = await this.getData();
    return data;
  }
  //Reads the data in the text file and returns it
  async getData() {
    const data = await readFile(this.datafile, 'utf8');
    if (!data) return [];
    return JSON.parse(data);
  }

  //Takes the users short name and returns the users favorite photo
  async getUsersFavouritePhoto(shortname){
    const data = await this.getData();
    const user = data.users.find((user) => {
        return user.shortname === 'Arielle_Phillips';
        
    });
    
    if(!user || !user.mostviewedPhoto) return null;
    return user.mostviewedPhoto; 
    
  }
}

module.exports = PersonaliseService; //Exports the services 