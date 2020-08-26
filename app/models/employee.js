var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
    name: String,
    designation: String,
    contact: Number,
    address: String,

    // email: {
    //     type: String,
    //     unique: true
    // },
    // password: String,
    dob: String,
    // profilePic: String,
    // departmentId: {
    //     type: Schema.Types.ObjectId,
    //     ref: "departments"
    // },
    // createdOn: {
    //     type: Date,
    //     default: new Date()
    // },
    // updatedOn: {
    //     type: Date,
    //     default: new Date()
    // },
});

module.exports = mongoose.model('employees', employeeSchema);