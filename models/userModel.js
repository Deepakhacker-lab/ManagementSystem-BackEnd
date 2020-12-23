const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User Model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    }
}
);

module.exports = mongoose.model('user', userSchema);