const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const writeFile = util.promisify(fs.writeFile);


class ContactService {

  constructor(datafile) {
    this.datafile = datafile;
  }

  async addEntry(name, email, message){
    
    const data = await this.getData();
    console.log(data);
    data.unshift({name, email, message});
    
    return writeFile(this.datafile, JSON.stringify(data));
    y
  }

  //Returns a JSON file with all the data for feedback
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