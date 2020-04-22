// Contact Service Class's purpose is to load the data that has been sub,itted from the Contact page on site, and convert it to json which can then be stored in the data file titled contact.json. The variable 'data' holds all the data.
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const writeFile = util.promisify(fs.writeFile);

// New Class
class ContactService {
//Passes the data into the constructor 
  constructor(datafile) {
    this.datafile = datafile;
  }
// Recieves data the was inputted through the contact page and rewrites it as json data
  async addEntry(name, email, message){
    
    const data = await this.getData();
    console.log(data);
    data.unshift({name, email, message});
    
    return writeFile(this.datafile, JSON.stringify(data));
    y
  }

  //Returns a JSON file with all the data for contact
  async getList() {
    const data = await this.getData();
    return data;
  }

  //Reads the JSON file and returns the data
  async getData() {
    const data = await readFile(this.datafile, 'utf8');
    if (!data) return [];
    return JSON.parse(data);
  }
}

module.exports = ContactService; //Exports the service