const fs = require('fs'); 
const util = require('util');

const readFile = util.promisify(fs.readFile)

class ViewworkService{

    constructor(datafile){
        this.datafile = datafile;
    }

    async getData(){

        const data = await readFile(this.datafile, 'utf8');

        if(!data) return [];
        return JSON.parse(data).viewwork;
    }

    async getAlltypes(){
        const data = await this.getData();

        return data.map((viewwork) =>{
        return {type:viewwork.type};
        });
    }

    async getList(){
        const data = await this.getData();

        return data.map((viewwork) =>{
            return {type:viewwork.type, summary:viewwork.summary};
        });
    }

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
    
    async getPhotosForType(type){
        const data = await this.getData()
        const oneType = data.find((oneType)=>{
            return oneType.type === type;
        });
        if(!oneType || !oneType.lightbox) return null;
        return oneType.lightbox;
    }

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