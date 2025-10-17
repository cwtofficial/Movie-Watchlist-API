const mongoose = require('mongoose');

const connectDb = async (uri) => {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDb;
