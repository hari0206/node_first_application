var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  // age: {
  //   type: Number,
  //   default: null
  // },
  // phoneNumber: {
  //   type: String,
  //   default: null
  // }
}); 

module.exports = mongoose.model('users', userSchema);