var mongoose = require('mongoose');
mongoose.set('useCreateindex', true);
var Schema = mongoose.Schema;

var masterSchema = new Schema({
    name: String,
    description:String,
    price: Number,
    itemImage: String,
    createdOn: {
        type: Date,
        default: new Date()
    },
    updatedOn:{
        type:Date,
        default: new Date()
    },
});

module.exports = mongoose.model('masters', masterSchema);
