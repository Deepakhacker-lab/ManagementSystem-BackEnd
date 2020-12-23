const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Task Model
const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref:'user',
        required: true
    }
}
);

module.exports = mongoose.model('task', taskSchema);