var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  name: String,
  email: String,
  password: String,
  admin: Boolean,
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');