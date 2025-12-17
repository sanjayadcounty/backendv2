const mongoose = require('mongoose');
const allUserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile: {
    type: Number,
    required: true,
    unique: true
  },
   address: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('AllUser', allUserSchema);