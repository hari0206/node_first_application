var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
var Schema = mongoose.Schema;

var departmentSchema = new Schema({
    name: String,
    description: String,
    createdOn: {
        type: Date,
        default: new Date()
    },
    updatedOn: {
        type: Date,
        default: new Date()
    },
});

module.exports = mongoose.model('departments', departmentSchema);