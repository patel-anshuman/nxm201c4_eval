const mongoose = require('mongoose');

const searchSchema = mongoose.Schema({
    userID: {type: String, required: true},
    searches: [ {type: String, required: true} ]
},{
    versionKey: false
})

const SearchModel = mongoose.model('search',searchSchema);

module.exports = {SearchModel};