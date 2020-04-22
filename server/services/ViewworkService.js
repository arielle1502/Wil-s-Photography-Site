// the Viewwork Service Class's purpose is to load the data from viewwork.json and load specific parts of it into organized methods. The variable data will store all of the data, the variable oneType will hold the data of one specific type, and the variable 'lightbox' will hold all of the photos.
const fs = require('fs'); 
const util = require('util');

const readFile = util.promisify(fs.readFile)

class ViewworkService{
//Passes the data into the constructor 
    constructor(datafile){
        this.datafile = datafile;
    }
//Reads the data in the text file and returns it
    async getData(){

        const data = await readFile(this.datafile, 'utf8');

        if(!data) return [];
        return JSON.parse(data).viewwork;
    }
//Returns a list of all three of the photo types
    async getAlltypes(){
        const data = await this.getData();

        return data.map((viewwork) =>{
        return {type:viewwork.type};
        });
    }
//Returns a list of all the types and their corresponding summaries
    async getList(){
        const data = await this.getData();

        return data.map((viewwork) =>{
            return {type:viewwork.type, summary:viewwork.summary};
        });
    }
// returns the information for one type by passing a type through
    async getOnetype(type){
        const data = await this.getData();
        const oneType = data.find((oneType)=>{
            return oneType.type === type;
        });
        if(!oneType) return null;

        return{
            type: oneType.type,
            summary: oneType.summary
        }
    }
// returns all of the photos for one type by passing a type through
    async getPhotosForType(type){
        const data = await this.getData()
        const oneType = data.find((oneType)=>{
            return oneType.type === type;
        });
        if(!oneType || !oneType.lightbox) return null;
        return oneType.lightbox;
    }
// returns all of the photos
    async getAllPhotos(){
        const data = await this.getData();
        const lightbox = data.map((viewwork)=>{
            return viewwork.lightbox;
        });
    var allPhotos = [];

    lightbox.forEach(function(element){
        allPhotos.push(...element);
    });
    return allPhotos;
    }
}
module.exports = ViewworkService;