const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email Already Exist'],
      required: [true, 'Please provide email'],
    },
    name: {
      type: String,
      required: [true, 'Please provide name'],
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
