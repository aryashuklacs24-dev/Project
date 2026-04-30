// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   licence: { type: String,
//      required: true },
//   age: { type: Number,
//      required: true },
//   owner: { type: String,
//      required: true }
// });

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  licence: { type: String, required: true },
  age: { type: Number, required: true },
  owner: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);