const path = require('path')
module.exports = {
    development:{
        sitename: 'Wil Shamsabadi Photography',
        data: {
            viewwork: path.join(__dirname, 'data/viewwork.json'),
            contact: path.join(__dirname, 'data/contact.json')
        }
    },
    production:{
        sitename: 'Wil Shamsabadi Photography',
        data: {
            viewwork: path.join(__dirname, 'data/viewwork.json'),
            contact: path.join(__dirname, 'data/contact.json')
        }
    }
}