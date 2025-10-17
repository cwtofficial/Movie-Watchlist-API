const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Movie must belong to a user.'],
    },
    title: {
      type: String,
      required: [true, 'Movie title is required'],
      maxLength: [200, 'Title cannot exceed 200 characters'],
      // unique: [true, 'Xmen movie already exists in the database'],
    },
    year: {
      type: Number,
      required: [true, 'Movie year is required'],
    },
    movieStatus: {
      type: String,
      enum: {
        values: ['pending', 'ongoing', 'completed'],
        message: '{VALUE} is not a valid movie status',
      },
      default: 'pending',
    },
    genre: {
      type: String,
      enum: {
        values: ['Action', 'Comedy', 'Horror', 'Sci-Fi', 'Romance', 'Other'],
        message: '{VALUE} is not a valid genre',
      },
      required: [true, 'Movie genre is required'],
    },

    // ai: {
    //   aiDetails: {
    //     type: String,
    //   },
    //   aiRottenTomato:
    // },

    rating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [10, 'Rating cannot exceed 10'],
    },
  },

  { timestamps: true },
);

module.exports = mongoose.model('Movies', movieSchema);
