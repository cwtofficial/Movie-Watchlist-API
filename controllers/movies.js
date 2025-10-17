// TEST IMPLEMENTATION

// const { movies, users } = require('../data/data');

// const getMovie = (req, res) => {
//   console.log('Route Parameter:', req.params); // req params are always sent as strings
//   const id = parseInt(req.params.id);
//   const movie = movies.find((movie) => movie.id === id);
//   if (!movie) {
//     return res.status(404).json({
//       error: true,
//       message: `movie with id: ${id} is not found.`,
//     });
//   }
//   res.status(200).json({
//     success: true,
//     data: movie,
//     message: 'Movie is retuend succesfully.',
//   });
// };

// const getMovies = (req, res) => {
//   const query = req.query;
//   console.log('Request Query', query);
//   const title = req.query.title;
//   const username = req.query.name;

//   const movie = movies.find((movie) => movie.title.toLowerCase() === title);
//   const user = users.find((user) => user.name.toLowerCase() === username);

//   if (!movie || !user) {
//     return res.status(404).json({
//       error: true,
//       message: `movie and user is not found.`,
//     });
//   }

//   res.status(200).json({
//     success: true,
//     data: {
//       movie: movie,
//       user: user,
//     },
//     message: 'Movie is retuend succesfully.',
//   });
// };

// const getAllMovies = (req, res) => {
//   res
//     .status(200)
//     .json({ success: true, data: movies, totalAmountOfMovies: movies.length });
// };

// const createMovies = (req, res) => {
//   const data = req.body;
//   console.log('This is what the client sends....', data);

//   if (!data.title || !data.year) {
//     return res.status(400).json({
//       message: 'Movie title and Movie year is required.',
//     });
//   }
//   movies.push(data);
//   res.status(201).json({
//     success: true,
//     message: `The movie with title: ${data.title} has been added succesfully.`,
//   });
// };

// const updateMovies = (req, res) => {
//   const id = parseInt(req.params.id);
//   const movie = movies.find((movie) => movie.id === id);
//   const data = req.body;
//   if (!data.title) {
//     return res.status(400).json({
//       error: true,
//       message: 'Movie title is required.',
//     });
//   }
//   console.log('Data:', data);

//   if (!movie) {
//     return res.status(404).json({
//       error: true,
//       message: 'movie not found.',
//     });
//   }
//   movie.title = data.title;
//   res.status(200).json({
//     success: true,
//     message: 'Title update is successful',
//     data: movie,
//   });
// };

// const deleteMovie = (req, res) => {
//   const data = req.body;
//   const { title } = data;
//   if (!title) {
//     return res.status(400).json({
//       error: true,
//       message: 'Movie title is required.',
//     });
//   }
//   const movie = movies.find(
//     (movie) => movie.title.toLowerCase() === title.toLowerCase(),
//   );
//   if (!movie) {
//     return res.status(404).json({
//       error: true,
//       message: 'movie not found.',
//     });
//   }
//   const updatedMovies = movies.filter(
//     (movie) => movie.title.toLowerCase() !== title.toLowerCase(),
//   );
//   res.status(200).json({
//     success: true,
//     message: 'Movie is deleted succesfully.',
//     movies: updatedMovies,
//   });
// };

// const getUserAndMovie = (req, res) => {
//   console.log('Route Parameter:', req.params);
//   const userId = parseInt(req.params.userId);
//   const movieId = parseInt(req.params.movieId);

//   const user = users.find((user) => user.id === userId);
//   const movie = movies.find((movie) => movie.id === movieId);

//   if (!movie || !user) {
//     return res.status(404).json({
//       error: true,
//       message: `movie or user  is not found.`,
//     });
//   }

//   res.status(200).json({
//     success: true,
//     data: {
//       user: user,
//       movie: movie,
//     },
//     message: 'Movie is retuend succesfully.',
//   });
// };

// const blockedEndpoint = (req, res) => {
//   res.json({ success: true, message: 'You will never see this' });
// };

// module.exports = {
//   getMovie,
//   getMovies,
//   getAllMovies,
//   createMovies,
//   updateMovies,
//   deleteMovie,
//   getUserAndMovie,
//   blockedEndpoint,
// };

// // app.get('/movies/:id', (req, res) => {

// // });

// // app.get('/get-movies', (req, res) => {
// // //
// // });

// REAL IMPLEMENATATION

const MovieModel = require('../models/MovieSchema');
const { StatusCodes } = require('http-status-codes');
const UserSchema = require('../models/UserSchema');
const MovieSchema = require('../models/MovieSchema');
const createResponse = require('../utils/createResponse');

const createMovie = async (req, res) => {
  const { id } = req.user;
  const data = req.body;

  try {
    const user = await UserSchema.findById(id);
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'User not found.',
      });
    }
    if (!data.title || !data.year || !data.genre) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Movie Title, Genre and Year is required.',
      });
    }
    const newMovie = await MovieModel.create({ user: id, ...data });
    res
      .status(StatusCodes.CREATED)
      .json(createResponse('Movie is created succesfully', newMovie));
  } catch (error) {
    console.log(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

const getAllUserMovies = async (req, res) => {
  const { id } = req.user;
  try {
    const movies = await MovieSchema.find({ user: id });
    if (movies.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ` No movies found.`,
      });
    }
    res
      .status(StatusCodes.OK)
      .json(createResponse('Movies found successfully.', movies));
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

const getMovieById = async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await MovieModel.findById(id);
    if (!movie) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: `Movie with ${id} is not found.`,
      });
    }
    res.status(StatusCodes.OK).json({
      message: 'Movie is found successfully.',
      data: movie,
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await MovieModel.find();
    if (movies.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: `No movies has been created yet.`,
      });
    }
    res.status(StatusCodes.OK).json({
      message: 'All movies are returned succesfully.',
      allMovies: movies,
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

const deleteMovie = async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await MovieModel.findByIdAndDelete(id);
    if (!movie) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: `Movie with id: ${id} does not exist.`,
      });
    }
    res.status(StatusCodes.OK).json({
      message: 'movie is deleted succesfully.',
      data: movie,
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

const updateMovie = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  if (!data) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Data is required',
    });
  }
  try {
    const movie = await MovieModel.findById(id);
    if (!movie) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: `Movie with id: ${id} does not exist.`,
      });
    }
    movie.title = data.title;
    await movie.save();
    res.status(StatusCodes.OK).json({
      message: 'movie is updated succesfully.',
      data: movie,
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

module.exports = {
  createMovie,
  getMovieById,
  getAllMovies,
  deleteMovie,
  updateMovie,
  getAllUserMovies,
};
